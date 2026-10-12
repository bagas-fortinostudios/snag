---
name: Snag
description: A Mac utility's website that looks like the Mac it runs on. Light macOS glass, one field, light Terminal windows.
colors:
  system-blue: "#0071e3"
  system-blue-hover: "#0062c4"
  link-blue: "#0066cc"
  blue-wash: "rgba(0, 113, 227, .09)"
  done-green: "#1a7f37"
  switch-green: "#34c759"
  amber: "#9a5b00"
  amber-wash: "rgba(255, 159, 10, .12)"
  red: "#c4271b"
  red-wash: "rgba(255, 59, 48, .09)"
  ground: "#fbfbfd"
  ground-2: "#f5f5f7"
  ink: "#1d1d1f"
  ink-2: "#48484d"
  ink-3: "#6e6e73"
  hair: "rgba(0, 0, 0, .08)"
  hair-2: "rgba(0, 0, 0, .12)"
  glass: "rgba(255, 255, 255, .62)"
  glass-strong: "rgba(255, 255, 255, .78)"
  glass-edge: "rgba(255, 255, 255, .9)"
  fill-tertiary: "rgba(118, 118, 128, .12)"
  white: "#ffffff"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(44px, 7.4vw, 80px)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-.04em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(40px, 6vw, 64px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-.035em"
  section:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(30px, 4vw, 44px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(26px, 3.2vw, 34px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-.03em"
  lede:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(19px, 2.2vw, 24px)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "-.022em"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-.01em"
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"SF Pro Display\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-.005em"
  mono:
    fontFamily: "ui-monospace, \"SF Mono\", SFMono-Regular, Menlo, Monaco, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
rounded:
  code: "6px"
  window: "12px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "99px"
spacing:
  gutter: "22px"
  nav-height: "52px"
  stack: "44px"
  section: "112px"
  section-home: "120px"
components:
  button-primary:
    backgroundColor: "{colors.system-blue}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.system-blue-hover}"
  button-primary-done:
    backgroundColor: "{colors.done-green}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, .8)"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "36px"
  button-secondary-hover:
    backgroundColor: "{colors.white}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.link-blue}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
  button-quiet-hover:
    backgroundColor: "{colors.blue-wash}"
  button-sm:
    height: "30px"
    padding: "0 12px"
  button-lg:
    height: "48px"
    padding: "0 24px"
  paste-field:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 8px 0 22px"
    height: "68px"
  segmented-track:
    backgroundColor: "{colors.fill-tertiary}"
    rounded: "{rounded.pill}"
    padding: "4px"
  segmented-option-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  terminal-window:
    backgroundColor: "rgba(255, 255, 255, .86)"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.window}"
    padding: "14px 18px 16px"
  chip:
    backgroundColor: "rgba(118, 118, 128, .1)"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  callout:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px 18px"
  nav:
    backgroundColor: "rgba(251, 251, 253, .68)"
    textColor: "{colors.ink-2}"
    height: "52px"
---

# Design System: Snag

## Overview

**Creative North Star: "The Site Is a Mac"**

Snag is a Mac utility, so the site behaves like a piece of macOS Sonoma in light mode, rendered at Apple.com fidelity. A near-white ground carries a soft blue, lilac and peach light field near the top of each page; frosted white glass sits over it. Everything a visitor touches is a native-feeling control: pill buttons, a segmented control, macOS switches, a popover, and light Terminal windows with traffic lights. The home page is one search-style field and nothing louder than it.

Density is calm and generous. Pages are centred, headlines are large, tight-tracked and bold, and explanation lives on its own page behind the nav rather than stacked under the field. The single accent is system blue; every other colour is either neutral grey or a status colour that means something.

The site builds a command. It never downloads, uploads, or tests anything, and nothing in the visual language may suggest otherwise: no progress bars, no download buttons that look like they fetch a file, no fake success states beyond "Copied".

**Key Characteristics:**
- Light only (`color-scheme: light`); there is no dark theme.
- System SF stack for text, SF Mono for commands. No web fonts.
- One accent: system blue. Green, amber and red are status only.
- Frosted glass over a blurred light field; soft, cool, diffuse shadows.
- Every command lives in a light macOS Terminal window.
- Pills everywhere a control is pressable.
- No kickers or eyebrows above headings.

## Colors

A cool, near-white Apple palette with one blue accent and three quiet status colours.

### Primary
- **System Blue** (system-blue): the only accent. Primary buttons, the selected Finder row, focus rings, the active setup step badge, the lead border on How it works, flow numerals, check icons in the promise pills, and the field's focus halo. Hover deepens to **Pressed Blue** (system-blue-hover).
- **Link Blue** (link-blue): text links, quiet buttons, mono flag lines and Terminal output notes. Slightly darker than System Blue so blue text holds contrast on white.
- **Blue Wash** (blue-wash): the default callout background and quiet-button hover.

### Neutral
- **Apple Ground** (ground): page background and the frosted nav tint.
- **Footer Grey** (ground-2): footer band only.
- **Ink** (ink): headings, input text, emphasised words.
- **Secondary Ink** (ink-2): body prose, ledes, nav links, Terminal output.
- **Tertiary Ink** (ink-3): placeholders, captions, metadata, the `%` prompt.
- **Hairline** (hair) and **Strong Hairline** (hair-2): dividers between rows, steps and table lines; hair-2 also rims secondary buttons and keycaps.
- **Glass**, **Strong Glass**, **Glass Edge** (glass, glass-strong, glass-edge): the frosted material and its white rim.
- **Tertiary Fill** (fill-tertiary): macOS system fill for the segmented track, selects, chevron discs and step-number discs.

### Status
- **Done Green** (done-green): a copy button after a successful copy, and the "Done when" and "The fix." labels.
- **Switch Green** (switch-green): the macOS switch when on, nothing else.
- **Amber** (amber, amber-wash): warning chips and warning callouts.
- **Red** (red, red-wash): invalid-link message and field ring, error messages in Help, the cross icons in the "Snag does not" list.

### Named Rules
**The One Blue Rule.** System blue is the only accent. A second hue may appear only as a status colour with a specific meaning, or as the faint tint inside the light field and gradient glass bands.

**The Brand Colours Stay in Their Icons Rule.** YouTube red, Instagram pink, TikTok and X black and Facebook blue appear only inside their own platform marks in the field and the supported-sites row.

## Typography

**Display Font:** the system SF stack (-apple-system, BlinkMacSystemFont, SF Pro Text, SF Pro Display, then Helvetica Neue)
**Body Font:** the same stack
**Label/Mono Font:** ui-monospace and SF Mono, then Menlo

**Character:** pure Apple. Heavy, tight-tracked headlines over a light, slightly negative-tracked 17px body, and SF Mono reserved for anything a visitor will type or read back from Terminal.

### Hierarchy
- **Display** (700, clamp(44px, 7.4vw, 80px), 1.03): the home headline only.
- **Headline** (700, clamp(40px, 6vw, 64px), 1.05): inner page titles.
- **Section** (700, clamp(30px, 4vw, 44px), 1.1): section heads; home sections run slightly larger (up to 48px) and the CTA band slightly smaller (up to 40px).
- **Title** (700, clamp(26px, 3.2vw, 34px), 1.12): setup steps and the Help first-move panel. Card titles and table rows drop to 600 at 17 to 24px.
- **Lede** (400, clamp(19px, 2.2vw, 24px), 1.35): the sub under any page title, ink-2, balanced, 40 to 44ch.
- **Body** (400, 17px, 1.47): all prose, ink-2, capped at 64 to 68ch.
- **Label** (500, 14px, 1): buttons and segmented options. Nav links sit at 13.5px.
- **Caption** (400, 12.5px): footer, chips, Terminal titles, figure captions.
- **Mono** (13.5px, 1.65, tracking 0): Terminal bodies; the home result runs at 15px, the Source listing at 12.5px.

### Named Rules
**The Mono Means Terminal Rule.** Monospace is only for text that is typed into or printed by Terminal: commands, flags, file paths, the script. Never for labels or decoration.

**The No Kicker Rule.** Headings stand alone. No small uppercase line, category tag or eyebrow sits above a heading on any page.

## Layout

A centred, single-column Apple layout. Content containers are 1080px (sections, nav, footer), 980px (hero and page titles) and 760px (reading column), all with a 22px gutter. The paste field and its result are 720px wide and are the largest object in the first viewport.

The glass nav is sticky at 52px. The home hero starts 104px below it (64px under 680px); inner page titles start at 88px. Sections are separated by 112px on inner pages and 120px on home. Two-column bands (home "lands" section 5fr/7fr, Setup 230px sticky step list beside the steps, Source 300px facts panel, Help two-up) collapse to one column at 900px or 820px.

The hero light field is a 900px band of three blurred radial blobs (blue left, lilac right, peach lower centre) positioned absolutely behind content at z-index -1, with main at z-index 1 above it. Inner pages use the lower, dimmer variant (560px, 75% opacity). It never sits in front of text and never takes pointer events.

Responsive behaviour that is part of the system:
- Under 820px the nav collapses to a menu button; links drop into a frosted sheet with a full-width Set up pill at the bottom.
- Under 680px the format segmented control becomes a four-column full-width grid with short labels (Edit, Small, Audio, 4K), the full names kept as accessible labels.
- Under 680px the Get command button becomes a 46px icon-only circle with an arrow, and the Paste button is hidden.
- Under 560px the Downloads window drops its sidebar and Kind column.

## Elevation & Depth

Depth comes from frosted glass over the light field, plus soft, cool, diffuse shadows tinted toward navy. There are no hard edges or offset shadows except the 1px keycap shadow under `kbd`. Glass is `saturate(180%) blur(28px)` with a white 1px rim.

Glass is used for the nav, the paste field, the options popover, the segmented track, every Terminal window, and the shared glass container (result tips, promise and "does not" pills, the formats table, Help faults and first-move panel, the setup step list, the Source facts panel, the CTA band).

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgba(0,0,0,.04), 0 2px 8px rgba(0,0,0,.04)`): secondary buttons and flow numerals.
- **Float** (`0 2px 6px rgba(0,0,0,.04), 0 12px 32px rgba(15,30,70,.08)`): glass containers, Terminal windows, the mobile nav sheet.
- **Lifted** (`0 4px 12px rgba(0,0,0,.04), 0 24px 64px rgba(15,30,70,.12)`): the paste field and the popover, the two things that sit highest.
- **Selected segment** (`0 1px 3px rgba(0,0,0,.1), 0 3px 10px rgba(0,0,0,.06)`): the white thumb in the segmented control.
- **Focus halo** (`0 0 0 4px rgba(0,113,227,.18), 0 0 0 1px rgba(0,113,227,.5)`): the paste field when focused; the same shape in red marks a bad link.

### Named Rules
**The Light Field Stays Behind Rule.** The coloured light field sits at z-index -1 behind all content and is decoration only. Colour reaches the foreground only through glass.

**The Field Is Highest Rule.** The paste field and the popover carry the Lifted shadow; nothing else on the page may sit higher.

## Shapes

Rounded and soft, following macOS. Every pressable control is a full pill (99px): buttons, nav links, the field, the segmented track and its options, chips and list pills. Containers step up with size: 14px for callouts and tips, 20px for popovers, tables, the facts panel and the step list, 28px for the CTA band and Help panels. Terminal and Finder windows use the macOS window radius of 12px. Inline code and keycaps use 6px. Circles are reserved for traffic lights, numbered step badges, the clear button and chevron discs.

## Components

### Buttons
Quiet, native, pill-shaped.
- **Shape:** full pill (99px). Heights 30px, 36px and 48px.
- **Primary:** System Blue with white 14px/500 text. Used for Set up Snag, Get command, and Copy in every Terminal window.
- **Hover / Focus:** hover deepens to Pressed Blue; press scales to 0.97 on the shared ease; focus shows a 3px blue outline at 55% offset by 2px.
- **Secondary:** 80% white with a hairline inset rim and Rest shadow; hover goes solid white.
- **Quiet:** transparent with Link Blue text; hover shows Blue Wash. Used for Paste and Show yt-dlp.
- **Done:** after a copy the button turns Done Green and reads "Copied". This is the only success state the site shows.
- **Disabled:** 40% opacity.

### Chips
- **Style:** 10% grey fill, 12.5px/500 ink-2 text, 13px icon, pill.
- **State:** warning and bad variants swap to the amber and red washes. Chips describe the command (where it lands, codec, container); they never show progress.

### Cards / Containers
- **Corner Style:** 14px, 20px or 28px by size (see Shapes).
- **Background:** Glass, sometimes with a faint blue to lilac to peach tint (CTA band) or blue tint (Help first move).
- **Shadow Strategy:** Float.
- **Border:** 1px white glass rim; internal rows divided by hairlines.
- **Internal Padding:** 16px 18px for tips and callouts, 20px 26px for table rows, 22px 28px for fault rows, 56px 32px for the CTA band.

### Inputs / Fields
- **Style:** the paste field is a 68px Strong Glass pill (60px under 680px) with a 26px platform icon at the left that swaps to the detected site's mark, a 19px input, a clear disc when filled, a quiet Paste button and the primary Get command button inside it.
- **Focus:** blue focus halo plus the Lifted shadow.
- **Error:** red halo and a red message line below; the icon swaps to a red alert circle.
- **Selects** in the popover are 8px-rounded Tertiary Fill with a drawn chevron.

### Navigation
- **Style:** sticky 52px frosted bar tinted with the ground colour, hairline bottom. Wordmark with the blue app-icon square left, five links centred, a small Set up Snag pill right.
- **States:** links are 13.5px ink-2 pills; hover adds a 4.5% black fill, the current page gets 6% fill and weight 500.
- **Mobile:** under 820px a menu button opens a frosted sheet of 17px links and a primary Set up pill.

### Segmented Control
The format picker is a macOS segmented control: a pill track of Tertiary Fill over 72% white glass, 4px inset, with a white raised thumb on the selected option. It is a radio group with arrow-key movement. Under 680px it fills the width as four equal columns with short labels.

### macOS Switch
38 by 22px pill, 24% grey off, Switch Green on, white 18px knob that slides 16px on the shared ease. Used only in the options popover.

### Terminal Window
The signature component. Every command on the site sits in a light macOS Terminal window: 86% white glass, 12px radius, a light grey gradient title bar with red, yellow and green traffic lights, a 12.5px title, and Copy (and on home, Show yt-dlp) at the right. The body is SF Mono on near-white with a grey `% ` prompt; continuation lines indent. Printed output uses a paler body tint and keeps its columns, scrolling sideways as Terminal does. The Source page adds a hairline-ruled line-number gutter. The same window chrome draws the illustrated Downloads Finder window on home, which is labelled as an illustration.

### Result Reveal
Get command drops the Terminal window in below the field (420ms, from 14px up, 98.5% scale and 6px blur, on the shared ease) and copies the line at once. With reduced motion the window appears instantly.

## Do's and Don'ts

### Do:
- **Do** keep the page light only; `color-scheme: light`, no dark variant.
- **Do** set all text in the system SF stack and all commands in SF Mono.
- **Do** use System Blue as the one accent and keep green, amber and red to status meanings.
- **Do** put every command in a light Terminal window with traffic lights and a Copy button.
- **Do** keep the hero light field behind content at z-index -1.
- **Do** make every pressable control a pill.
- **Do** use the shared ease `cubic-bezier(.16, 1, .3, 1)` for movement and drop to instant changes under reduced motion.
- **Do** keep short segmented labels and the icon-only Get command button under 680px.
- **Do** state plainly, in the footer and the copy, that the website does not download anything.

### Don't:
- **Don't** add a dark theme or dark Terminal plates.
- **Don't** load web fonts or swap in a display face.
- **Don't** add a second accent colour.
- **Don't** put a kicker, eyebrow or category label above a heading.
- **Don't** let the light field sit in front of content or take clicks.
- **Don't** show download progress, file-saved states, or any button that looks like it fetches a file; the only success state is "Copied".
- **Don't** use hard or offset shadows; depth is glass and soft diffuse shadow.
- **Don't** set labels, buttons or captions in monospace.
