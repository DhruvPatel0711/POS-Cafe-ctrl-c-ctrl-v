# DESIGN.md — Odoo POS Cafe Design System

> Extracted from Stitch MCP project: **Cafe POS Web App** (`projects/9019465333709295387`)
> 5 Design Systems: Amber Slate POS, Amber Slate, Amber Slate Operational, plus variants

---

## 1. Creative North Star: "The Midnight Artisan"

A design philosophy that balances the rugged, utilitarian needs of a high-traffic POS with the sophisticated, atmospheric depth of a late-night bistro. We reject rigid, boxed-in layouts of traditional POS systems in favor of **Tonal Depth** and **Intentional Asymmetry**. The interface uses high-contrast typography and glowing accents to ensure speed and accuracy under pressure.

---

## 2. Color Palette

### Accent (Consistent across both themes)

| Token                | Hex           | Usage                        |
|----------------------|---------------|------------------------------|
| `primary`            | `#FFC174`     | Primary actions, key highlights |
| `primary-container`  | `#F59E0B`     | CTA gradient end, amber accent |
| `on-primary`         | `#472A00`     | Text on primary surfaces     |

---

### 2a. 🌙 DARK THEME — "The Midnight Artisan"

> Default theme. Deep slates with warm amber accents.

#### Surfaces

| Token                        | Hex         | Usage                               |
|------------------------------|-------------|--------------------------------------|
| `background`                 | `#081425`   | Main app background                 |
| `surface`                    | `#081425`   | Base-level surfaces (DS1) / `#0B1326` (DS2-5) |
| `surface-dim`                | `#081425`   | Dimmed surface                      |
| `surface-bright`             | `#2F3A4C`   | Hover states, highlighted rows      |
| `surface-container-lowest`   | `#040E1F`   | Recessed wells, data-entry areas (DS1) / `#060E20` (DS2-5) |
| `surface-container-low`      | `#111C2D`   | Secondary zones, KPI card bg (DS1) / `#131B2E` (DS2-5) |
| `surface-container`          | `#152031`   | Navigation rail, sidebars (DS1) / `#171F33` (DS2-5) |
| `surface-container-high`     | `#1F2A3C`   | Glass overlays (80% + blur) (DS1) / `#222A3D` (DS2-5) |
| `surface-container-highest`  | `#2A3548`   | Active interaction areas, inputs (DS1) / `#2D3449` (DS2-5) |
| `surface-variant`            | `#2A3548`   | Variant containers (DS1) / `#2D3449` (DS2-5) |
| `surface-tint`               | `#FFB95F`   | Tint overlay color                  |

#### Primary (Amber)

| Token                      | Hex         | Usage                           |
|----------------------------|-------------|----------------------------------|
| `primary`                  | `#FFC174`   | Primary actions, key highlights |
| `primary-container`        | `#F59E0B`   | CTA gradient end                |
| `primary-fixed`            | `#FFDDB8`   | Fixed primary                   |
| `primary-fixed-dim`        | `#FFB95F`   | Inactive but important states   |
| `on-primary`               | `#472A00`   | Text on primary                 |
| `on-primary-container`     | `#613B00`   | Text on primary container       |
| `on-primary-fixed`         | `#2A1700`   | Text on fixed primary           |
| `on-primary-fixed-variant` | `#653E00`   | Text on fixed variant           |
| `inverse-primary`          | `#855300`   | Inverse context primary         |

#### Secondary

| Token                        | Hex         | Usage                     |
|------------------------------|-------------|----------------------------|
| `secondary`                  | `#F0BD82`   | Secondary actions (DS1,2,4,5) / `#BCC7DE` (DS3) |
| `secondary-container`        | `#62400F`   | Secondary container bg (DS1,2,4,5) / `#3E495D` (DS3) |
| `secondary-fixed`            | `#FFDDB8`   | Fixed secondary (DS1,2,4,5) / `#D8E3FB` (DS3) |
| `secondary-fixed-dim`        | `#F0BD82`   | Dimmed secondary           |
| `on-secondary`               | `#472A00`   | Text on secondary          |
| `on-secondary-container`     | `#DDAC72`   | Text on secondary container (DS1,2,4,5) / `#AEB9D0` (DS3) |

#### Tertiary (Cyan/Blue)

| Token                        | Hex         | Usage                       |
|------------------------------|-------------|-----------------------------|
| `tertiary`                   | `#8FD5FF`   | Status: blue/info badges    |
| `tertiary-container`         | `#1ABDFF`   | Tertiary container          |
| `tertiary-fixed`             | `#C5E7FF`   | Fixed tertiary              |
| `tertiary-fixed-dim`         | `#7FD0FF`   | Dimmed tertiary             |
| `on-tertiary`                | `#00344A`   | Text on tertiary            |
| `on-tertiary-container`      | `#004966`   | Text on tertiary container  |

#### Semantics & Text

| Token                    | Hex         | Usage              |
|--------------------------|-------------|--------------------|
| `error`                  | `#FFB4AB`   | Error text/icons   |
| `error-container`        | `#93000A`   | Error background   |
| `on-error`               | `#690005`   | Text on error      |
| `on-error-container`     | `#FFDAD6`   | Text on error bg   |
| `on-background`          | `#D8E3FB`   | Text on background (DS1) / `#DAE2FD` (DS2-5) |
| `on-surface`             | `#D8E3FB`   | Primary text (DS1) / `#DAE2FD`-`#DBE2FD` (DS2-5) |
| `on-surface-variant`     | `#D8C3AD`   | Secondary/muted text |
| `outline`                | `#A08E7A`   | Outline elements   |
| `outline-variant`        | `#534434`   | Ghost borders (15%)|
| `inverse-surface`        | `#D8E3FB`   | Inverse surface    |
| `inverse-on-surface`     | `#263143`   | Text on inverse    |

---

### 2b. ☀️ LIGHT THEME — "The Daylight Artisan"

> Derived from inverse tokens and light-mode specs documented in DS2 ("Amber Slate") and DS4 ("Amber Slate POS - Architectural Ledger").

#### Surfaces

| Token                        | Hex         | Usage                              |
|------------------------------|-------------|--------------------------------------|
| `background`                 | `#F8FAFC`   | Main app background                 |
| `surface`                    | `#FFFFFF`   | Base-level surfaces                 |
| `surface-dim`                | `#E2E8F0`   | Dimmed surface                      |
| `surface-bright`             | `#FFFFFF`   | Bright surface                      |
| `surface-container-lowest`   | `#FFFFFF`   | Cards, raised elements              |
| `surface-container-low`      | `#F1F5F9`   | Secondary zones, soft backgrounds   |
| `surface-container`          | `#E7ECF2`   | Navigation rail, sidebars           |
| `surface-container-high`     | `#DDE3EB`   | Glass overlays (80% + blur)         |
| `surface-container-highest`  | `#D4DAE2`   | Active interaction areas, inputs    |
| `surface-variant`            | `#E2E8F0`   | Variant containers                  |
| `surface-tint`               | `#F59E0B`   | Tint overlay color                  |

#### Primary (Amber — same across themes)

| Token                      | Hex         | Usage                           |
|----------------------------|-------------|----------------------------------|
| `primary`                  | `#855300`   | Primary actions (darkened for contrast) |
| `primary-container`        | `#FFDDB8`   | CTA container background        |
| `on-primary`               | `#FFFFFF`   | Text on primary                 |
| `on-primary-container`     | `#2A1700`   | Text on primary container       |
| `primary-fixed`            | `#FFDDB8`   | Fixed primary                   |
| `primary-fixed-dim`        | `#FFB95F`   | Inactive but important states   |

#### Secondary

| Token                        | Hex         | Usage                     |
|------------------------------|-------------|----------------------------|
| `secondary`                  | `#7D5700`   | Secondary actions          |
| `secondary-container`        | `#FFDDB8`   | Secondary container bg     |
| `on-secondary`               | `#FFFFFF`   | Text on secondary          |
| `on-secondary-container`     | `#2A1700`   | Text on secondary container|

#### Tertiary (Cyan/Blue)

| Token                        | Hex         | Usage                       |
|------------------------------|-------------|-----------------------------|
| `tertiary`                   | `#006589`   | Status: blue/info badges    |
| `tertiary-container`         | `#C5E7FF`   | Tertiary container bg       |
| `on-tertiary`                | `#FFFFFF`   | Text on tertiary            |
| `on-tertiary-container`      | `#001E2D`   | Text on tertiary container  |

#### Semantics & Text

| Token                    | Hex         | Usage              |
|--------------------------|-------------|--------------------|
| `error`                  | `#BA1A1A`   | Error text/icons   |
| `error-container`        | `#FFDAD6`   | Error background   |
| `on-error`               | `#FFFFFF`   | Text on error      |
| `on-error-container`     | `#410002`   | Text on error bg   |
| `on-background`          | `#1E293B`   | Text on background |
| `on-surface`             | `#1E293B`   | Primary text       |
| `on-surface-variant`     | `#4A4639`   | Secondary/muted    |
| `outline`                | `#7C7768`   | Outline elements   |
| `outline-variant`        | `#CEC6B4`   | Ghost borders (15%)|
| `inverse-surface`        | `#283044`   | Inverse surface    |
| `inverse-on-surface`     | `#DAE2FD`   | Text on inverse    |

---

## 3. Typography

### Dual-Font Strategy (DS1 — Primary Design System)

| Role        | Font       | Usage                                        |
|-------------|------------|----------------------------------------------|
| **Headline**| `Manrope`  | Display, headline scales. KPIs, category heads |
| **Body**    | `Inter`    | Title, body, label scales. Tables, receipts    |
| **Label**   | `Inter`    | Small labels, modifiers, add-ons               |

### Mono-Font Strategy (DS2-DS5 — Alternate Design Systems)

| Role        | Font       | Usage                                        |
|-------------|------------|----------------------------------------------|
| **All**     | `Manrope`  | All headline, body, label scales              |

### Hierarchy

| Element             | Scale          | Font    | Weight  | Color (Dark)        | Color (Light)       |
|---------------------|----------------|---------|---------|---------------------|---------------------|
| Total Amount        | `display-md`   | Manrope | Bold    | `#FFC174`           | `#855300`           |
| Product Names       | `title-sm`     | Inter   | Medium  | `on-surface`        | `on-surface`        |
| Modifiers/Add-ons   | `label-md`     | Inter   | Regular | `#D8C3AD`           | `#4A4639`           |
| KPI metric label    | `label-md`     | Inter   | Regular | `on-surface-variant`| `on-surface-variant`|
| KPI value           | `headline-lg`  | Manrope | Bold    | `#FFC174`           | `#855300`           |
| Section headers     | `headline-sm`  | Manrope | SemiBold| `on-surface`        | `on-surface`        |
| Data tables         | `body-md`      | Inter   | Regular | `on-surface`        | `on-surface`        |
| Status/Metadata     | `label-sm`     | Inter   | Regular | `on-surface-variant`| UPPERCASE + 0.05em  |

### Type Scale Reference (from DS5)

| Role       | Token        | Size     | Notes                          |
|------------|-------------|----------|--------------------------------|
| Display    | `display-lg`| 3.5rem   | Large totals, primary KPIs     |
| Headline   | `headline-md`| 1.75rem | Section titles                 |
| Title      | `title-sm`  | 1.0rem   | Card headers, category labels  |
| Body       | `body-md`   | 0.875rem | Workhorse for lists/tables     |
| Label      | `label-sm`  | 0.6875rem| Timestamps, secondary IDs      |

### Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
```

---

## 4. Spacing & Shape

| Property            | Value       |
|---------------------|-------------|
| Roundness preset    | `ROUND_FOUR` (0.25rem base) |
| Spacing scale       | `1` (default) |
| Card corners        | `xl` → 0.75rem |
| Button corners      | `lg` → 0.5rem (DS1) / `4px` (DS2-5) |
| Badge corners       | `full` (pill shape, 9999px) |
| Small internal      | `sm` → 0.125rem |
| Row vertical padding| 0.75rem (DS1) / 8-12px tight (DS2-5) |
| Card internal pad   | 16px or 24px |

### Spacing System (rem)

| Token   | Value   | px   |
|---------|---------|------|
| `xs`    | 0.25rem | 4px  |
| `sm`    | 0.5rem  | 8px  |
| `md`    | 0.75rem | 12px |
| `lg`    | 1rem    | 16px |
| `xl`    | 1.5rem  | 24px |
| `2xl`   | 2rem    | 32px |
| `3xl`   | 3rem    | 48px |

---

## 5. Elevation & Depth

### The "No-Line" Rule (ALL 5 Design Systems agree)

> **Borders are strictly prohibited for sectioning.** Separation must come from background color shifts between surface tiers. This creates a "carved" or "layered glass" look.

### Tonal Layering (Dark)

| Layer         | Token                       | Hex       | Purpose                         |
|---------------|-----------------------------|-----------|----------------------------------|
| Base Level    | `surface`                   | `#081425` | Main app background (DS1) / `#0B1326` (DS2-5) |
| Second Level  | `surface-container`         | `#152031` | Nav rail, sidebars (DS1) / `#171F33` (DS2-5) |
| Top Level     | `surface-container-highest` | `#2A3548` | Active selections, inputs (DS1) / `#2D3449` (DS2-5) |
| Recessed Well | `surface-container-lowest`  | `#040E1F` | Data entry wells (DS1) / `#060E20` (DS2-5) |

### Tonal Layering (Light)

| Layer         | Token                       | Hex       | Purpose                         |
|---------------|-----------------------------|-----------|----------------------------------|
| Base Level    | `background`                | `#F8FAFC` | Main app background             |
| Surface       | `surface`                   | `#FFFFFF` | Cards, elevated areas           |
| Container     | `surface-container-low`     | `#F1F5F9` | Secondary zones                 |
| Active        | `surface-container-highest` | `#D4DAE2` | Active selections, inputs       |

### Ambient Shadows

```css
/* Dark theme — floating modals only */
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);

/* Light theme — floating modals */
box-shadow: 0 12px 40px rgba(13, 30, 37, 0.06);

/* DS2-5 variant: tinted slate shadow */
box-shadow: 0 8px 24px rgba(6, 14, 32, 0.4);
```

### Ghost Border Fallback (accessibility only)

```css
/* Dark */
border: 1px solid rgba(83, 68, 52, 0.15); /* outline-variant at 15% */

/* Light */
border: 1px solid rgba(206, 198, 180, 0.15);
```

### Glassmorphism (floating menus)

```css
/* Dark */
background: rgba(31, 42, 60, 0.80); /* surface-container-high */
backdrop-filter: blur(20px);

/* Light */
background: rgba(221, 227, 235, 0.80);
backdrop-filter: blur(12px);
```

---

## 6. Component Guidelines

### KPI Cards ("The Pulse")

- Background: `surface-container-low`
- Label: `label-md`, `on-surface-variant`
- Value: `headline-lg`, `primary`
- Corners: `xl` (0.75rem)
- No borders
- DS4+: Optional 2px left "amber accent bar" for active/trending KPIs

### Buttons

| Type        | Dark Background                           | Light Background                      | Text (Dark)     | Text (Light)          | Corner  |
|-------------|-------------------------------------------|---------------------------------------|-----------------|-----------------------|---------|
| Primary     | Gradient: `#FFC174` → `#F59E0B`          | Gradient: `#855300` → `#6B4200`       | `#472A00`       | `#FFFFFF`             | `lg`    |
| Secondary   | Transparent + ghost border (20%)          | `surface-container-highest`           | `primary`       | `primary`             | `lg`    |
| Tertiary    | No background                             | No background                         | `primary`       | `primary`             | —       |
| Danger      | `#93000A`                                  | `#FFDAD6`                             | `#FFDAD6`       | `#410002`             | `lg`    |

### Status Badges (Pill shape)

| Status         | Dark BG     | Dark Text   | Light BG    | Light Text  |
|----------------|-------------|-------------|-------------|-------------|
| Info/Blue      | `#004966`   | `#8FD5FF`   | `#C5E7FF`   | `#001E2D`   |
| Pending/Amber  | `#62400F`   | `#FFC174`   | `#FFDDB8`   | `#2A1700`   |
| Error/Red      | `#93000A`   | `#FFB4AB`   | `#FFDAD6`   | `#410002`   |
| Success/Green  | `#004966`   | `#8FD5FF`   | `#A3F69C`   | `#002204`   |

### Data Tables ("The Ledger")

- No divider lines between rows
- Hover state: `surface-bright` (dark) / `surface-container-lowest` (light)
- Row padding: 0.75rem vertical
- Numbers: tabular-lined / monospaced
- Alignment: right-align prices & quantities
- DS4: Optional zebra striping via `surface-container-lowest`/`surface-container-low` alternation

### Input Fields

- Fill: `surface-container-highest`
- Active state: 2px bottom-only highlight in `primary`
- No full border box
- Placeholder: `on-surface-variant`

### The "Active Ledger" Row (DS3-5)

- When an item is selected, show a 4px wide vertical amber bar on the left edge
- Background shifts to `surface-container-highest`

---

## 7. Do's and Don'ts

### ✅ Do

- Use vertical white space to group related items (16px–24px gaps)
- Use `primary-fixed-dim` for inactive but important states
- Leverage `surface-container` tiers for left-to-right flow (dark → light)
- Use `Manrope` for any number over 24px
- Use `label-sm` in UPPERCASE + 0.05em letter-spacing for metadata
- Use amber (`#F59E0B`) sparingly — it's a laser, not a paintbrush
- Right-align prices, left-align item names for clear "gutter" spacing

### ❌ Don't

- Use pure `#000000` or `#FFFFFF` — always use tokens
- Use 1px solid borders to wrap sections — use background shifts
- Use illustrations where typography can do the job — let data be the hero
- Use standard drop shadows — use tonal layering
- Use rounded corners > 0.375rem for operational components (DS2-5)
- Use icons without labels unless universally recognized

---

## 8. CSS Custom Properties (Dual Theme)

```css
/* ============================================
   DARK THEME (default)
   ============================================ */
:root,
[data-theme="dark"] {
  /* Surfaces */
  --bg:                    #081425;
  --surface:               #081425;
  --surface-dim:           #081425;
  --surface-bright:        #2F3A4C;
  --surface-lowest:        #040E1F;
  --surface-low:           #111C2D;
  --surface-container:     #152031;
  --surface-high:          #1F2A3C;
  --surface-highest:       #2A3548;
  --surface-variant:       #2A3548;
  --surface-tint:          #FFB95F;

  /* Primary */
  --primary:               #FFC174;
  --primary-container:     #F59E0B;
  --primary-fixed:         #FFDDB8;
  --primary-fixed-dim:     #FFB95F;
  --on-primary:            #472A00;
  --on-primary-container:  #613B00;

  /* Secondary */
  --secondary:             #F0BD82;
  --secondary-container:   #62400F;
  --on-secondary:          #472A00;
  --on-secondary-container:#DDAC72;

  /* Tertiary */
  --tertiary:              #8FD5FF;
  --tertiary-container:    #1ABDFF;
  --on-tertiary:           #00344A;
  --on-tertiary-container: #004966;

  /* Error */
  --error:                 #FFB4AB;
  --error-container:       #93000A;
  --on-error:              #690005;
  --on-error-container:    #FFDAD6;

  /* Text */
  --on-bg:                 #D8E3FB;
  --on-surface:            #D8E3FB;
  --on-surface-variant:    #D8C3AD;

  /* Borders */
  --outline:               #A08E7A;
  --outline-variant:       #534434;

  /* Inverse */
  --inverse-surface:       #D8E3FB;
  --inverse-on-surface:    #263143;
  --inverse-primary:       #855300;

  /* Typography */
  --font-headline:         'Manrope', sans-serif;
  --font-body:             'Inter', sans-serif;

  /* Radius */
  --radius-sm:             0.125rem;
  --radius-md:             0.25rem;
  --radius-lg:             0.5rem;
  --radius-xl:             0.75rem;
  --radius-full:           9999px;
}

/* ============================================
   LIGHT THEME
   ============================================ */
[data-theme="light"] {
  /* Surfaces */
  --bg:                    #F8FAFC;
  --surface:               #FFFFFF;
  --surface-dim:           #E2E8F0;
  --surface-bright:        #FFFFFF;
  --surface-lowest:        #FFFFFF;
  --surface-low:           #F1F5F9;
  --surface-container:     #E7ECF2;
  --surface-high:          #DDE3EB;
  --surface-highest:       #D4DAE2;
  --surface-variant:       #E2E8F0;
  --surface-tint:          #F59E0B;

  /* Primary */
  --primary:               #855300;
  --primary-container:     #FFDDB8;
  --primary-fixed:         #FFDDB8;
  --primary-fixed-dim:     #FFB95F;
  --on-primary:            #FFFFFF;
  --on-primary-container:  #2A1700;

  /* Secondary */
  --secondary:             #7D5700;
  --secondary-container:   #FFDDB8;
  --on-secondary:          #FFFFFF;
  --on-secondary-container:#2A1700;

  /* Tertiary */
  --tertiary:              #006589;
  --tertiary-container:    #C5E7FF;
  --on-tertiary:           #FFFFFF;
  --on-tertiary-container: #001E2D;

  /* Error */
  --error:                 #BA1A1A;
  --error-container:       #FFDAD6;
  --on-error:              #FFFFFF;
  --on-error-container:    #410002;

  /* Text */
  --on-bg:                 #1E293B;
  --on-surface:            #1E293B;
  --on-surface-variant:    #4A4639;

  /* Borders */
  --outline:               #7C7768;
  --outline-variant:       #CEC6B4;

  /* Inverse */
  --inverse-surface:       #283044;
  --inverse-on-surface:    #DAE2FD;
  --inverse-primary:       #FFB95F;

  /* Typography (same fonts) */
  --font-headline:         'Manrope', sans-serif;
  --font-body:             'Inter', sans-serif;

  /* Radius (same) */
  --radius-sm:             0.125rem;
  --radius-md:             0.25rem;
  --radius-lg:             0.5rem;
  --radius-xl:             0.75rem;
  --radius-full:           9999px;
}
```

---

## 9. Stitch MCP Source Reference

| # | Asset ID                             | Display Name              | Mode | Accent    | Neutral   | Font(s)          |
|---|--------------------------------------|---------------------------|------|-----------|-----------|------------------|
| 1 | `10a214b23c4c4fc5b33a557bdab9f092`   | Amber Slate POS           | Dark | `#F59E0B` | `#1E293B` | Manrope + Inter  |
| 2 | `5ccdb9cfbc4a4473ae15b3d13df461f4`   | Amber Slate               | Dark | `#F59E0B` | `#0F172A` | Manrope          |
| 3 | `a638bcb8e3534f499ccc5de610574fc8`   | Amber Slate POS           | Dark | `#F59E0B` | `#0F172A` | Manrope          |
| 4 | `ac3b049dd4be4d40923712b23b52adc1`   | Amber Slate POS           | Dark | `#F59E0B` | `#0F172A` | Manrope          |
| 5 | `cf3ecb887aac4e65a591561401596a6c`   | Amber Slate Operational   | Dark | `#F59E0B` | `#0B1326` | Manrope          |

> **Extracted:** 2026-04-04
> **Project:** `projects/9019465333709295387` ("Cafe POS Web App")
> **Color Variant:** FIDELITY | **Device:** DESKTOP
