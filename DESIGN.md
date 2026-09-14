---
name: Snag
description: A 1968-74 mail-order tool catalog sheet that reviews itself honestly, then prints the command.
colors:
  stock: "#d3d1c6"
  stock-2: "#c9c7bb"
  ink: "#15150e"
  ink-2: "#4f4f42"
  ink-3: "#6d6d5e"
  cyan: "#0b6a89"
  cyan-field: "#0b6a89"
  verm: "#b8371c"
  plate: "#16160f"
  plate-tx: "#e4e1d3"
  plate-rl: "#34342a"
  btn-face: "#cfcdc2"
  btn-face2: "#a3a196"
  rule: "#15150e"
  hair: "rgba(21,21,14,.26)"
typography:
  display:
    fontFamily: "Chivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(56px, 13vw, 150px)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-.045em"
  headline:
    fontFamily: "Chivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(25px, 4.2vw, 40px)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-.028em"
  title:
    fontFamily: "Chivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(16px, 2.4vw, 24px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-.012em"
  lede:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Chivo, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: ".14em"
  mono:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.55
  plate:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  none: "0px"
spacing:
  hairline: "4px"
  tight: "6px"
  snug: "10px"
  plate: "14px"
  field: "20px"
  column-gap: "30px"
  mast-gap: "44px"
  entry-foot: "46px"
components:
  button-stamp:
    backgroundColor: "{colors.btn-face}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 13px"
  button-stamp-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
  button-stamp-quiet:
    backgroundColor: "{colors.btn-face2}"
    textColor: "{colors.ink}"
  button-stamp-done:
    backgroundColor: "{colors.verm}"
    textColor: "#ffffff"
  plate-command:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.plate-tx}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
    padding: "14px 15px"
  plate-head:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    padding: "8px 15px"
  field-cyan:
    backgroundColor: "{colors.cyan-field}"
    textColor: "#eef6f9"
    rounded: "{rounded.none}"
    padding: "22px 24px"
  input-text:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
    padding: "11px 12px"
  warn-block:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "11px 13px"
---

# Design System: Snag

## Overview

**Creative North Star: "The Access-to-Tools Catalog Sheet"**

Snag is a cheap-offset mail-order tool catalog printed between 1968 and 1974, reproduced exactly. The ground is pulp stock, grey-olive and deliberately not cream, carried by a real 256x256 procedural grain tile fixed behind the page rather than a flat fill. Ink is heavy near-black. One process cyan carries whole regions of the sheet, not accents. A cheap vermilion is held back for stamps and marks only. Commands are set in dark halftone plates the way a catalog sets its photographs, and those plates stay dark in both themes because a photograph does not invert with the paper.

Density is catalog density: every entry is its own two-column sheet with a marginal access rail, and the rails, rules and stamps do all the separating. There is no card system, no border-radius anywhere in the build, and no box-shadow anywhere in the build. Depth is ink weight and full-field colour, nothing else. Dark theme is not a second world; it is the same sheet as a press proof, with ink and stock swapped and the grain pushed harder.

The page's authority is its honesty, and the visual system serves that: the honest paragraph is Source Serif, the machine is Courier Prime, and the imperative is Chivo 900 caps. Confirmed rejection: the centred dark terminal hero with a one-line install box and a copy button. This sheet does not centre, does not put a hero image anywhere, and prints the whole script on the page before it asks anyone to run anything.

**Key Characteristics:**
- Pulp stock ground with a real grain tile at token-controlled opacity (0.55 light, 0.9 dark)
- One process cyan as a field, one vermilion as a mark, nothing else chromatic
- Dark halftone command plates that never invert with the theme
- Rules and hairlines instead of cards; zero radius, zero shadow
- Three fixed voices: Chivo display and UI, Source Serif 4 prose, Courier Prime machine
- Stamped motion only: one 90ms step animation, dropped entirely under reduced motion

## Colors

A three-ink press run on grey-olive pulp: near-black ink, one process cyan, one cheap vermilion, all sitting on stock that is never white.

### Primary
- **Process Cyan** (`{colors.cyan}`): The second ink. As `cyan` it carries links, the recognised-platform marks in the order queue, and the hovered-link baseline. As `cyan-field` it floods whole disclosure regions (the "this page cannot touch your computer" block, the "try this first" block) and paints `::selection`. In light theme both tokens carry the same value; the split only materialises in dark, where the link ink brightens (`#4aa8c9`) while the field ground deepens (`#0d5570`) so the region stays legible with near-white text on it.

### Secondary
- **Cheap Vermilion** (`{colors.verm}`): The stamp ink, and never a general accent. It appears as the step numerals, the refusal crosses in the margin rail, the focus ring, the caret in every input, the hover ink on links and tick-row names, the border of the password warning, and the momentary field of a button that has just copied. It is the only colour permitted to arrive as a mark rather than a region.

### Neutral
- **Pulp Stock** (`{colors.stock}`): The sheet. Page ground and the ground inside inputs, overlaid by the fixed grain tile.
- **Second Stock** (`{colors.stock-2}`): A half-tone deeper sheet for the order stub, the coupon's perforated border, keyboard keys, and the scrollbar track.
- **Press Ink** (`{colors.ink}`): All headings, prose and hard borders (1px stub, coupon and input strokes; 2px section underlines).
- **Ink Two** (`{colors.ink-2}`): Secondary prose, the colophon, step explanations, option descriptions, rail section heads.
- **Ink Three** (`{colors.ink-3}`): The faintest set ink: unticked tick-box strokes, plate captions, scrollbar thumb.
- **Rule** (`{colors.rule}`): The heavy separating rule. Tracks the ink, which is why it inverts with the theme while the plate does not.
- **Hairline** (`{colors.hair}`): The 26%-opacity ink hair that divides rows, rails and dotted table-of-contents leaders.

### Tertiary
- **Plate Black** (`{colors.plate}`) / **Plate Text** (`{colors.plate-tx}`) / **Plate Rule** (`{colors.plate-rl}`): The catalog photograph. Command plates, plate captions and the full source listing. Plate text is the same near-white in both themes.
- **Button Face** (`{colors.btn-face}`) / **Quiet Button Face** (`{colors.btn-face2}`): Printed label faces for the copy buttons. The face stays light in both themes because it is printed label stock, not sheet.

### Named Rules
**The Colour-Is-The-Sheet Rule.** Cyan arrives as a field, not a mark. When cyan appears, it owns a whole block edge to edge with its own light text; it is never a tint, a badge, or a 1px accent border.

**The Vermilion-Is-A-Mark Rule.** Vermilion is only ever a stamp, a numeral, a cross, a caret, a focus ring, or a hover ink. The single exception in the build is the 1600ms confirmed-copy state on a stamp button, which is itself a stamp landing. Never a section ground, never body text.

**The Plate Does Not Invert Rule.** The stock and the ink swap between themes. The plate, its halftone screen and its text do not. A command plate is a photograph on the sheet, and it reads the same in light and in dark.

**The Split-Token Rule.** Where one token cannot hold both themes at legible contrast, split it by job, not by tint: `cyan` is ink, `cyan-field` is ground. Read the split as a contrast mechanism, not as a two-step ramp.

## Typography

**Display Font:** Chivo (with Helvetica, Arial, sans-serif)
**Body Font:** Source Serif 4 (with Georgia, serif)
**Label/Mono Font:** Courier Prime (with Courier New, monospace)

**Character:** Chivo 900 in tight negative-tracked caps is the catalog's shouting headline stock; Source Serif 4 is the honest evaluation copy a catalog writes under the photograph; Courier Prime is the typewriter that set the colophon, the margin rail and every command. The three never swap jobs.

### Hierarchy
- **Display** (Chivo 900, `clamp(56px, 13vw, 150px)`, line-height .82, -.045em, uppercase): The masthead name only. One per sheet.
- **Headline** (Chivo 900, `clamp(25px, 4.2vw, 40px)`, line-height .98, -.028em, uppercase): The entry heading that opens each article.
- **Title** (Chivo 700, `clamp(16px, 2.4vw, 24px)`, line-height 1.2): The masthead strap at max 26ch; also the step headings (18px, 900) and pull statements (17.5px at max 40ch, ruled above and below).
- **Lede** (Source Serif 4 600, 19px, line-height 1.5, max 44ch): The one-sentence honest summary directly under every entry heading.
- **Body** (Source Serif 4 400, 16.5px, line-height 1.62, max 68ch): All evaluation prose. Field blocks cap at 62ch, fault prose at 66ch.
- **Label** (Chivo 700, 11-13px, letter-spacing .1em to .16em, uppercase): Plate captions, coupon field labels, stub label, rail section heads, all button text.
- **Mono** (Courier Prime 400, 11.5-13px): Colophon, margin-rail copy, queue rows, the landing line, select and input text, and every command plate (13px / 1.7) and the full source listing (12px / 1.62).

### Named Rules
**The Three Voices Rule.** Chivo speaks for the catalog (names, headings, labels, buttons). Source Serif 4 speaks the honest evaluation. Courier Prime speaks for the machine and the margin. A voice never takes another's job; prose is never set in mono for texture, and a command is never set in the serif.

**The One Imperative Per Sheet Rule.** Display scale is spent once, on the masthead. Every other heading steps down to headline or below, so the sheet has exactly one thing shouting.

## Layout

The page is a printed sheet, not a stack of containers. `.sheet` caps at 1160px with its own 20px inline padding; heavy `.fullrule` bars (4px, and 1px in the thin variant) sit **outside** `.sheet` so rules bleed to the viewport edge while the type stays in column.

The masthead is a two-column grid (`1fr / 318px`, 44px gap, baseline-aligned to the bottom) with the name and colophon left and the order stub right, so the coupon's first tick boxes are visible at the fold on desktop.

Every entry is its own grid: a 232px margin column plus `minmax(0, 1fr)` body, 30px gap, opened by a 3px rule. In the DOM `.bodycol` precedes `.marg`, and CSS `order` restores the visual left rail. That keeps heading order valid for assistive technology and puts the evaluation prose first on mobile.

Setup steps are a counter-driven sequence, each a 46px numeral column plus body, divided by hairlines.

Sole breakpoint at **860px**. Below it: the masthead collapses to one column and the order stub is hidden (the full coupon is one anchor away); entries collapse to a single column with the rail moving below the body and reflowing into an auto-fit 190px grid; step numerals shrink to a 34px column; command plates switch to wrapping with a 1.3em hanging indent per line, since a clipped command is an unusable command; the source listing keeps `pre` so the script stays readable by horizontal scroll.

Spacing rhythm is printers' rhythm rather than an 8pt grid: 4px rules, 6-10px between related lines, 14-15px inside plates, 20-24px inside fields and the coupon, 26-30px between columns, 44-46px at the masthead and the foot of an entry.

## Elevation & Depth

No shadows. There is not a single `box-shadow` in the build, and depth is entirely printed: the fixed pulp grain layer behind everything, ink weight (hairline at 26% opacity, 1px ink, 2px ink, 3px rule, 4px full-bleed rule), and full-field colour. The dark command plate reads as recessed only because it is a different ink on the same paper, screened with an 8x8 45-degree halftone dot at its own size.

Browser surfaces are part of the sheet: `::selection` takes the cyan field with near-white text, scrollbars take stock track with ink-three thumb, and the caret is vermilion.

### Named Rules
**The Printed-Depth Rule.** Depth comes from ink weight, grain and field colour. If a surface needs to feel separate, give it a rule, a field or a plate. Never a shadow, never a glow, never a lift on hover.

## Shapes

Every corner in the system is square. `border-radius` does not appear in the build, on any element, in any state, including inputs, buttons, plates and tick boxes. Silhouettes are rectangles cut by rules.

The recurring forms are: the **full-bleed rule** (4px / 1px), the **hairline** (1px at 26% ink), the **hard stroke** (1px or 2px solid ink around stubs, inputs, the coupon and the warning), the **plate** (dark rectangle with halftone screen), and the **tick box** (18px, 16px or 15px square with a 1.5px stroke, holding a rotated stamp raster that overhangs its own box).

The coupon adds the one decorative geometry in the system: a 4px perforated border drawn as a 10px radial-gradient dot pattern in second stock, wrapping the ruled inner sheet. It is the only gradient in the build and exists to read as a tear-off form.

### Named Rules
**The No-Card Rule.** There is no card. Separation is a rule, a hairline, a stamp or a full-field colour. Nothing gets a rounded corner, a lifted edge or a container chrome it did not earn as print.

## Components

### Buttons
Buttons are printed labels stamped on the sheet, not raised controls.
- **Shape:** Square (0 radius), no border, 6px 13px padding, Chivo 700 11px uppercase at .1em.
- **Primary (`.stamp`):** Light printed label face on the sheet, ink text, nowrap.
- **Quiet (`.stamp.quiet`):** The darker label face, for the secondary action beside a primary (for example "Show raw yt-dlp" next to "Copy").
- **Hover:** The label face goes to paper white. No movement, no shadow, no transition.
- **Confirmed:** On a successful copy the button takes the vermilion field with white text and swaps its own text, then reverts after 1600ms. This is the only time vermilion becomes a ground.
- **Disabled:** Opacity .4, not-allowed cursor. The copy button is disabled while the coupon has no valid link.
- **Focus:** 2px solid vermilion, 2px offset, globally on `:focus-visible`.

### Inputs / Fields
- **Style:** Stock ground, 1px solid ink stroke, square, Courier Prime, vermilion caret. The order textarea is 13px / 1.7 with a minimum height of 84px and vertical resize only; the masthead stub input is 12px. The resolution cap is a native `select` styled the same way.
- **Placeholder:** Ink-two at full opacity, carrying real example links rather than instruction text.
- **Focus:** Global vermilion focus ring. No border colour change and no glow.

### Command Plate
The signature surface. A dark plate with the 8x8 halftone screen tiled across it, plate text in near-white Courier Prime, 14px 15px padding, `white-space: pre` and horizontal overflow on desktop. It is optionally preceded by a `.plate-head` caption bar in the same plate ink, ink-three label type, divided by a 1px plate rule, carrying the caption on the left and the copy button on the right. Every real command line is its own `<span class="ln">` so the mobile hanging indent applies per line, and the exact text lives on `dataset.raw` so copying is never polluted by markup. The full script uses the same plate at listing scale with a 460px max height.

### Field Block
A whole region flooded with the cyan field, near-white body text at max 62ch, a white Chivo 900 uppercase heading, 22px 24px padding. Reserved for the two statements the page most needs believed. Never used for decoration or for a third-level aside.

### Tick Row (signature)
The coupon's option control, and the system's state model. Each row is a bare `<button aria-pressed>` opened by a hairline, laid out as a tick column plus name, description and an optional mono spec, with the last row closed by a hairline. Unticked: ink-three box stroke, ink-two text. Ticked: ink box stroke, ink text, and the stamp raster revealed inside the box at `rotate(-7deg)`, overhanging its own box. Hovering reddens the name only. Three densities exist: the full mode row (18px box), the extras grid (16px box, auto-fit 258px columns), and the masthead stub row (15px box).

**State is a mark, not a hue.** A ticked row is not a filled pill or a tinted background; it is an inked impression sitting crooked on the box, exactly as a clerk would stamp a form.

### Margin Rail
The catalog's access column. Rail section heads are Chivo 700 uppercase at .14em in ink-two over a hairline; rail body is Courier Prime 12.5px. Refusals are list items with an inline vermilion SVG cross at 11px. The table of contents rows are Chivo 700 uppercase with a dotted hairline leader filling the gap, reddening on hover.

### Navigation
There is no navigation bar. The only wayfinding is the rail's table of contents and one jump link in the order stub, both label type, both underline-free, both taking vermilion on hover.

### Motion
One animation exists: `strike`, 90ms, `steps(2, end)`, from `scale(1.2) rotate(-16deg)` to the resting `rotate(-7deg)`, applied to the stamp raster and declared only inside `@media (prefers-reduced-motion: no-preference)`. Nothing else in the system transitions; hovers are instant swaps.

### Named Rules
**The Stamped-Motion Rule.** Motion lands, it does not travel. Every animated state change is a stepped impression of 90ms or less, and under reduced motion the system drops to no movement at all rather than to a shortened tween.

**The Every-Option-Present Rule.** All choices are printed at once, with the chosen one struck forward by the stamp. Nothing collapses into a dropdown to hide what the visitor is turning down, except the native resolution cap, which is a numeric range rather than a set of choices.

## Do's and Don'ts

### Do:
- **Do** paint cyan as a whole field with its own light text, not as an accent or a tint.
- **Do** keep vermilion for marks: numerals, crosses, carets, focus rings, hover ink and stamps.
- **Do** set every command in a dark halftone plate, one `<span class="ln">` per real line, with the exact text on `dataset.raw` for copying.
- **Do** separate with rules, hairlines, stamps and full-field colour; use a 3px rule to open an entry and a full-bleed 4px rule to close a region.
- **Do** put `.fullrule` outside `.sheet` so rules reach the viewport edge while type stays in the 1160px column.
- **Do** keep `.bodycol` before `.marg` in the DOM and restore the visual left rail with CSS `order`.
- **Do** hold the three voices apart: Chivo for names, headings, labels and buttons; Source Serif 4 for evaluation prose; Courier Prime for commands and marginalia.
- **Do** show state as an inked impression at `rotate(-7deg)`, not as a fill or a hue change.
- **Do** cap measure: 44ch for a lede, 68ch for prose, 62ch inside a cyan field, 40ch for a pull statement.
- **Do** theme the browser surfaces (`::selection`, focus ring, scrollbar, caret) so the sheet does not stop at the content edge.

### Don't:
- **Don't** add a border-radius. The build has none, anywhere, in any state.
- **Don't** add a box-shadow, a glow, or a hover lift. Depth is ink weight, grain and field colour.
- **Don't** introduce a card, a panel or a tile. Rules and plates do the separating.
- **Don't** invert the command plate with the theme. The plate is a photograph, and it stays dark on light and on dark stock.
- **Don't** let a fourth colour in. The system is stock, ink, one cyan, one vermilion.
- **Don't** animate anything longer than 90ms or with an eased tween; `steps(2, end)` is the grammar, and reduced motion means no movement.
- **Don't** spend display scale twice on one sheet.
- **Don't** clip a command. Below 860px plates wrap with a 1.3em hanging indent per line.
- **Don't** put a hero image, a centred terminal block, or a single install box with a copy button at the top of a sheet. That is the category default this world refuses.
