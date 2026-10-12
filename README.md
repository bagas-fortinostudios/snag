# snag

Save video from Instagram, TikTok, YouTube Shorts and YouTube longform to your
own Mac, in a codec that actually edits.

**Site:** the `site/` directory is five static pages (Overview, How it works,
Setup, Help, Source) sharing one stylesheet, no build step. It is published by
GitHub Pages from `.github/workflows/pages.yml` on every push to `main`. The
logo files are in `brand/`.

## What this is

`snag` is a shell script. It downloads nothing itself. [yt-dlp](https://github.com/yt-dlp/yt-dlp)
does all of the fetching and [ffmpeg](https://ffmpeg.org) does all of the merging,
transcoding and audio extraction. `snag` decides which flags to hand them based on
the link you paste.

What it adds is judgement, not capability:

- **The correct sort order.** Sorting by codec before resolution silently caps you
  at 1080p, because H.264 usually stops there and anything higher is VP9 or AV1.
  Sorting by resolution against an H.264-filtered list is what actually gives you
  the best file you can cut with.
- **Browser impersonation only where it is needed** (`--impersonate chrome` on
  TikTok and Instagram), which is what gets past 403 Forbidden.
- **`--no-playlist` by default**, so a YouTube link carrying `&list=` stays one video.
- **Per-link isolation**, so one dead link does not kill the rest of a batch.

## Install

Requires macOS with [Homebrew](https://brew.sh):

```sh
brew install ffmpeg pipx
pipx install "yt-dlp[default,curl-cffi]"
pipx ensurepath
```

The `curl-cffi` extra is the part that matters. Without it TikTok returns 403
regardless of which other flags you pass.

Then install `snag` itself — the full installer is on the site, and the complete
source is printed there too, because you should not paste an installer from a
website without reading it.

## Use

```sh
snag https://www.tiktok.com/@user/video/123
snag                                    # no URL reads your clipboard
snag --mp3 https://youtu.be/abc
snag --max --recode https://youtube.com/watch?v=abc
snag -q 1080 --sub https://youtube.com/watch?v=abc
snag --keep-names https://youtu.be/abc  # keep emoji and accents in the filename
snag dash                               # local control panel
```

Filenames are stripped to plain ASCII by default, because emoji and accents
break some editing software. `--keep-names` turns that off.

`--cookies` reads your Chrome login, which Instagram often requires. Chrome
holds its cookie database open, so quit Chrome first. If it is running, snag
says so and continues without the login rather than failing every link.

`snag dash` runs a small server on `127.0.0.1` that reports how stale your yt-dlp
is, upgrades it, and runs a self-test that downloads a short video, checks the
codec, and deletes it. It is reachable only from your own machine.

## Quality modes

| Mode | What you get |
|---|---|
| default | Best resolution available **in H.264**. No transcode, cuts immediately. |
| `--max` | Genuinely the best stream, usually AV1 above 1080p. Plays fine, edits badly. |
| `--max --recode` | Best stream re-encoded to H.264 CRF 18. Slow, but 4K that edits. This is what the site calls **4K (slow)**. |
| `--mp3` | Audio only, with cover art and metadata. |

## When it breaks

```sh
pipx upgrade yt-dlp
```

These sites change constantly and yt-dlp ships fixes within days. A stale install
is the single most common cause of "it stopped working yesterday".

## Licence

The `snag` script and this site are free to use and modify. yt-dlp and ffmpeg are
separate projects under their own licences and do the actual work.
