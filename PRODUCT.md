# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, single page, no framework. Deployed to Netlify (user's own Netlify account is connected). Also published as a Claude artifact during iteration. No build step: the page must be deployable as plain files.

## Users

Primary: anyone on the internet who wants to save a video from Instagram, TikTok or YouTube and has never opened Terminal. They arrive from a link, not a search for developer tools. They do not know what a codec, a container, or a package manager is, and they will abandon at the first command that errors without explanation.

Secondary: video post-production people (the author is a Post Production Manager) who already work in Premiere and Resolve and care specifically about whether a downloaded file cuts without transcoding.

Both are on macOS. The tooling is macOS-only as written (Homebrew, pipx, zsh, pbpaste).

## Product Purpose

Get a working video file into the visitor's Downloads folder with the fewest possible decisions, and make the one-time Terminal setup survivable for someone who has never used it.

Success is a stranger completing setup once without getting stuck, then downloading with a single short command from then on.

## Positioning

Every other "social video downloader" is an ad-funded website that uploads your link to their server, caps quality, watermarks, or breaks. This runs entirely on the visitor's own machine via yt-dlp and ffmpeg. Nothing is uploaded, there is no queue, no limit, and no ads.

The specific differentiator versus reading yt-dlp's own documentation: correct flag choices the visitor would not know to make. Chiefly that sorting by codec before resolution silently caps you at 1080p, which is the mistake the author's own earlier version shipped with.

## Operating Context

- Visitor is on macOS, in a browser, with Terminal closed and probably never opened.
- One-time setup: Homebrew, then ffmpeg + pipx, then yt-dlp with the curl-cffi extra. Requires the user's Mac login password (typed blind, no dots shown, which reliably scares people).
- Daily use: copy a link from Instagram/TikTok/YouTube, paste one command, file lands in ~/Downloads.
- The author maintains a companion script, `snag`, installed at ~/bin/snag, which wraps yt-dlp with per-platform flag selection.
- yt-dlp breaks regularly as sites change. `pipx upgrade yt-dlp` is the fix for the large majority of failures, and a stale install is the single most common cause of "it stopped working".

## Capabilities and Constraints

Confirmed working (tested on the author's machine, 2026-09-14):
- yt-dlp 2026.08.19 with curl_cffi impersonation (13 targets), ffmpeg 9.0.1.
- Four delivery modes: best H.264 (edit-ready, no transcode); best resolution any codec; best resolution re-encoded to H.264 CRF 18; MP3 audio with embedded cover art.
- Per-platform flags: `--impersonate chrome` for TikTok and Instagram; `--no-playlist` by default.
- Batch downloads run per-link so one failure does not kill the queue.

Constraints:
- A hosted web page CANNOT run commands on the visitor's machine, read their Downloads folder, or test a download. Every action is copy-paste into Terminal. The site must never imply otherwise.
- A password field in static client-side code is not access control and must not be presented as one.
- Real maintenance actions (upgrading yt-dlp, running a self-test) require something running locally on the user's own machine, not the hosted site.
- macOS only as written. Do not claim Windows or Linux support.

Terminology that must stay accurate: H.264/AV1/VP9 are codecs, MP4 is a container, CRF is a quality setting, yt-dlp does the downloading and ffmpeg does the merging and converting.

## Brand Commitments

Name: `snag`. Companion to the author's existing `grab` script (client footage via rclone/aria2c); `snag` is the social-media counterpart.

Voice: plain and honest. The author's stated preference is no em dashes, no filler, no AI-sounding wording. Tell people when something will not work rather than papering over it.

## Evidence on Hand

- Real, tested command output and version numbers from the author's machine.
- The `snag` script itself (~300 lines of bash at ~/bin/snag), which can be shown in full on the site.
- A real, verified failure case: `--recode-video mp4` silently does nothing when the container is already mp4, which is why the script uses an explicit ffmpeg transcode instead.

No testimonials, no user numbers, no download counts, no press. Do not fabricate any.

## Product Principles

1. Never imply the website can do something only the visitor's own machine can do.
2. A stranger pasting an installer from a website is right to be suspicious. Show the script in full, on the page, before asking anyone to run it.
3. State what will actually land in Downloads: codec, container, and whether it needs transcoding before editing.
4. When something breaks, lead with the fix that works most often rather than a list of possibilities.
5. Setup is the hardest part of the product. Treat it as a primary surface, not an appendix.

## Accessibility & Inclusion

Visitors include people who have never used a terminal; wording must not assume prior knowledge. Commands are long strings that need to be copied reliably, so copy affordances matter more than manual selection. Standard web accessibility applies: visible focus, real contrast in both themes, keyboard operable controls.
