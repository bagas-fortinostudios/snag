import zlib, struct, math, os

OUT = "/Users/bagaskaragp/Claude/snag/site/assets"

def png(path, w, h, rgba):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += rgba[y*w*4:(y+1)*w*4]
    def chunk(t, d):
        c = struct.pack(">I", len(d)) + t + d
        return c + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    data = (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
            + chunk(b"IEND", b""))
    open(path, "wb").write(data)
    return len(data)

def hsh(ix, iy, seed):
    n = (ix * 374761393 + iy * 668265263 + seed * 2654435761) & 0xFFFFFFFF
    n = ((n ^ (n >> 13)) * 1274126177) & 0xFFFFFFFF
    return ((n ^ (n >> 16)) & 0xFFFFFF) / 0xFFFFFF

def smooth(t):
    return t * t * (3 - 2 * t)

def vnoise(x, y, freq, N, seed):
    """Value noise that tiles exactly over an N-pixel period."""
    cell = N / freq
    fx, fy = x / cell, y / cell
    ix, iy = int(math.floor(fx)), int(math.floor(fy))
    tx, ty = smooth(fx - ix), smooth(fy - iy)
    def g(a, b):
        return hsh(a % freq, b % freq, seed)
    v00, v10 = g(ix, iy), g(ix + 1, iy)
    v01, v11 = g(ix, iy + 1), g(ix + 1, iy + 1)
    return (v00 * (1 - tx) + v10 * tx) * (1 - ty) + (v01 * (1 - tx) + v11 * tx) * ty

# ---------------------------------------------------------------- pulp stock
# Seamless 256px paper tile: fibre noise as dark specks plus lighter flecks,
# low alpha so it sits under type without touching legibility.
N = 256
buf = bytearray(N * N * 4)
for y in range(N):
    for x in range(N):
        v = (vnoise(x, y, 64, N, 11) * 0.5 + vnoise(x, y, 32, N, 12) * 0.3
             + vnoise(x, y, 16, N, 13) * 0.2)
        fibre = vnoise(x * 1.0, y * 0.22, 32, N, 21)   # stretched: pulp fibre lies flat
        v = v * 0.72 + fibre * 0.28
        i = (y * N + x) * 4
        if v < 0.46:                      # dark speck
            a = int((0.46 - v) * 62)
            buf[i:i+4] = bytes((26, 24, 14, min(a, 26)))
        elif v > 0.60:                    # light fleck
            a = int((v - 0.60) * 46)
            buf[i:i+4] = bytes((255, 253, 244, min(a, 20)))
        else:
            buf[i:i+4] = bytes((0, 0, 0, 0))
print("pulp.png", png(os.path.join(OUT, "pulp.png"), N, N, buf), "bytes")

# ---------------------------------------------------------------- halftone
# Dots on a 45-degree lattice (one at the corner, one at the centre), which is
# what makes a square tile repeat seamlessly. 4x supersampled for clean edges.
T, S, R = 8, 4, 2.15
buf = bytearray(T * T * 4)
for y in range(T):
    for x in range(T):
        cov = 0
        for sy in range(S):
            for sx in range(S):
                px, py = x + (sx + 0.5) / S, y + (sy + 0.5) / S
                for cx, cy in ((0, 0), (T, 0), (0, T), (T, T), (T/2, T/2)):
                    if (px - cx) ** 2 + (py - cy) ** 2 <= R * R:
                        cov += 1
                        break
        a = int(cov / (S * S) * 30)
        i = (y * T + x) * 4
        buf[i:i+4] = bytes((228, 225, 211, a))
print("halftone.png", png(os.path.join(OUT, "halftone.png"), T, T, buf), "bytes")

# ---------------------------------------------------------------- inked stamp
# A struck check: stroke width wobbles along the path, a noise mask breaks the
# edges the way ink lifts off a rubber die, and loose spatter sits off the mark.
W, SS = 128, 4
BW = W * SS
pts = [(0.14, 0.55), (0.28, 0.72), (0.40, 0.80), (0.86, 0.17)]
segs = [((pts[i][0]*BW, pts[i][1]*BW), (pts[i+1][0]*BW, pts[i+1][1]*BW)) for i in range(len(pts)-1)]

def dist_seg(px, py, a, b):
    ax, ay = a; bx, by = b
    dx, dy = bx - ax, by - ay
    L = dx*dx + dy*dy
    t = 0.0 if L == 0 else max(0.0, min(1.0, ((px-ax)*dx + (py-ay)*dy) / L))
    qx, qy = ax + t*dx, ay + t*dy
    return math.hypot(px-qx, py-qy), t

acc = [0.0] * (W * W)
base = BW * 0.060
for by in range(BW):
    for bx in range(BW):
        best = 1e9; bt = 0.0
        for a, b in segs:
            d, t = dist_seg(bx, by, a, b)
            if d < best: best, bt = d, t
        # the die never inks evenly: width breathes along the stroke
        wob = 1.0 + 0.30 * (vnoise(bx*0.06, by*0.06, 16, 256, 31) - 0.5)
        hw = base * wob
        if best <= hw:
            edge = 1.0 - max(0.0, (best - hw*0.50) / (hw*0.50 + 1e-6))
            lift = vnoise(bx*0.16, by*0.16, 32, 256, 41)
            void = vnoise(bx*0.045, by*0.045, 16, 256, 51)
            ink = 1.0 if best < hw*0.45 else min(1.0, edge * 1.30)
            if best > hw*0.28:                   # ink lifts unevenly off the die
                f = (best - hw*0.28) / (hw*0.72)
                if lift < 0.34 + 0.34 * f:
                    ink *= max(0.0, lift / (0.34 + 0.34 * f)) ** 1.5
            if void < 0.34:                      # the die never contacted here
                ink *= 0.15 + 0.85 * (void / 0.34)
            if ink > 0:
                acc[(by//SS) * W + (bx//SS)] += ink
# loose spatter, sparse and only near the mark
for k in range(120):
    sx = int(hsh(k, 7, 91) * W); sy = int(hsh(k, 13, 92) * W)
    d = min(min(dist_seg(sx*SS, sy*SS, a, b)[0] for a, b in segs), 1e9)
    if base*1.1 < d < base*4.2:
        w = hsh(k, 21, 93)
        acc[sy * W + sx] += w * (SS*SS) * 0.9
        if w > 0.72 and 0 < sx < W-1 and 0 < sy < W-1:
            acc[sy*W + sx+1] += w * (SS*SS) * 0.3
            acc[(sy+1)*W + sx] += w * (SS*SS) * 0.25

buf = bytearray(W * W * 4)
for i in range(W * W):
    a = int(min(1.0, acc[i] / (SS*SS)) * 255)
    buf[i*4:i*4+4] = bytes((184, 55, 28, a))
print("stamp.png", png(os.path.join(OUT, "stamp.png"), W, W, buf), "bytes")
