# Blueprint to Builder Summit (summit.html) — Image Slot Manifest

Drop Wednesday's delivered graphics into **`assets/`** using these **exact filenames**.
Every slot is already wired in the HTML and shows a labeled dashed placeholder until the
file exists — so the page is fully built and QA-able now, and art drops in with zero rework.

| Filename (in `assets/`) | Type | Recommended size | Where it appears |
|---|---|---|---|
| `1_Hero_Image.png` | Transparent PNG (Mike cutout) | ~900×1100 | Hero (right) + Bottom CTA (left) |
| `1_Hero_Image_B.jpg` | Background | 1920×1080 | Hero background |
| `2_Logo.png` | Transparent PNG | ~360×120 | Brand bar + hero logo lockup |
| `Section_Background_Dark.jpg` | Background (tileable/cover) | 1920×1080 | Dark section bands |
| `Section_Background_Light.jpg` | Background (tileable/cover) | 1920×1080 | Curriculum section |
| `5_Meet_Your_Coach.jpg` | Photo | ~900×1100 | Meet-the-coach (alt) |
| `5_Meet_Your_Coach_B.jpg` | Background | 1600×1000 | Meet-the-coach background |
| `5_Meet_The_Coach_Mike_Jenkins.png` | Transparent PNG | ~900×1100 | Meet-the-coach portrait |
| `Day_1.png` | Tile | ~700×450 | Curriculum — Day 1 (The Blueprint) |
| `Day_2.png` | Tile | ~700×450 | Curriculum — Day 2 (The Build) |
| `Day_3.png` | Tile | ~700×450 | Curriculum — Day 3 (The Bag) |
| `Stub_GA.png` | Ticket stub | ~600×210 | GA tier card |
| `Stub_VIP.png` | Ticket stub | ~600×210 | VIP tier card |
| `Stub_Platinum.png` | Ticket stub | ~600×210 | Platinum tier card |
| `Rick_Ross.png` | Guest card photo | ~640×800 | Special Guest section |
| `Emcee.png` | Guest card photo **[SWAP]** | ~640×800 | Special Guest section (Shaky/David) |
| `8_CTA_Section.jpg` | Background | 1920×800 | Bottom CTA background |

**Countdown frame:** the countdown is live as styled boxes under the hero. If a decorative
"countdown frame" graphic is delivered, set it as the background of the `#cd` element (or send it and I'll wire it).

## Notes
- File extensions matter — match exactly (`.png` vs `.jpg` as listed). If a delivered file uses a different extension, tell me and I'll update the reference.
- After dropping files in, hard-refresh (Ctrl+Shift+R) or bump the asset version if a browser caches an empty slot.
- `1_Hero_Image.png` is reused in two places (hero + bottom CTA) — one file covers both.
