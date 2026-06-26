---
name: Literasi Sukabumi
colors:
  surface: '#fbf9f9'
  surface-dim: '#dcd9da'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f4'
  surface-container: '#f0edee'
  surface-container-high: '#eae7e8'
  surface-container-highest: '#e4e2e3'
  on-surface: '#1b1b1c'
  on-surface-variant: '#45474c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f3f0f1'
  outline: '#75777d'
  outline-variant: '#c5c6cc'
  surface-tint: '#565f70'
  primary: '#07101e'
  on-primary: '#ffffff'
  primary-container: '#1c2534'
  on-primary-container: '#838c9f'
  inverse-primary: '#bec7db'
  secondary: '#5b5e66'
  on-secondary: '#ffffff'
  secondary-container: '#dddfe8'
  on-secondary-container: '#5f636a'
  tertiary: '#190e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#30230c'
  on-tertiary-container: '#9e896b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae3f7'
  primary-fixed-dim: '#bec7db'
  on-primary-fixed: '#131c2a'
  on-primary-fixed-variant: '#3e4757'
  secondary-fixed: '#e0e2eb'
  secondary-fixed-dim: '#c4c6cf'
  on-secondary-fixed: '#181c22'
  on-secondary-fixed-variant: '#43474e'
  tertiary-fixed: '#f7dfbc'
  tertiary-fixed-dim: '#dac3a1'
  on-tertiary-fixed: '#251904'
  on-tertiary-fixed-variant: '#54442a'
  background: '#fbf9f9'
  on-background: '#1b1b1c'
  surface-variant: '#e4e2e3'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is centered on the intersection of traditional scholarship and modern community engagement. It targets a diverse demographic in Sukabumi, from students to educators, fostering an environment that feels both authoritative and accessible. 

The aesthetic is **Modern Professional with Soft-UI influences**, prioritizing high legibility and a welcoming digital atmosphere. By shifting toward a more muted, sophisticated palette, the design avoids the coldness of pure corporate design while maintaining a grounded, scholarly feel. The emotional response should be one of "structured inspiration"—where the user feels the platform is a reliable tool for growth and a vibrant hub for local intellectual life.

## Colors
The palette is rooted in a modernized "Book-ish" heritage, utilizing desaturated tones to ensure a calm, focused reading environment.

*   **Primary (Slate Blue-Grey):** Used for core branding and primary actions. It provides a contemporary, professional foundation that feels stable and academic.
*   **Secondary (Cool Grey):** Acts as a supporting tone for secondary UI elements and balanced interaction states.
*   **Tertiary (Deep Espresso):** A rich, dark accent used for high-contrast highlights or grounded semantic elements, evoking the deep tones of classic library wood and ink.
*   **Neutral (Medium Grey):** A balanced grey used for body text, borders, and UI scaffolding to maintain a clean, uncluttered interface.
*   **Surface:** The background uses soft, cool-tinted whites to reduce eye strain during long-form reading sessions.

## Typography
The system utilizes **Inter** for its exceptional readability and neutral character, which allows the content (the literature) to take center stage. 

Typography scales are tight to ensure maximum information density on mobile devices without sacrificing white space. Headlines use a slight negative letter-spacing to appear more cohesive and "premium." For body text, the line height is kept generous (1.5x) to facilitate comfortable long-form reading of book descriptions and community articles.

## Layout & Spacing
This design system follows a **Mobile-First Fluid Grid** philosophy. 

*   **Mobile (Default):** A 4-column system with 16px side margins and 16px gutters.
*   **Desktop:** Scales to a 12-column centered layout with a max-width of 1140px.
*   **Rhythm:** An 8px linear scale governs all padding and margin decisions. For internal card padding, 16px (`md`) is the standard, while 24px (`lg`) is used to separate major sections like "Today's Agenda" from "New Books."

## Elevation & Depth
The system employs a **Soft Layering** approach. Instead of harsh shadows, it uses a mix of subtle tonal shifts and extremely soft, large-radius shadows to differentiate surfaces.

*   **Level 0 (Base):** Soft surface background.
*   **Level 1 (Cards):** Pure white background with a subtle border and a faint drop shadow to suggest elevation.
*   **Level 2 (Active Elements):** For items like active accordion headers or pressed buttons, a slight inset shadow or tonal shift is used to indicate a physical press.
*   **Glassmorphism:** Navigation bars and sticky headers use a backdrop-blur (12px) with a semi-transparent surface tint to maintain context of the content scrolling beneath them.

## Shapes
The shape language is "Friendly-Geometric." The standard corner radius is **8px (0.5rem)**, which strikes a balance between professional precision and organic approachability.

*   **Interactive Elements:** Buttons and Input fields use the 8px standard.
*   **Containers:** Larger cards and modals use `rounded-lg` (16px) to appear more distinct from the background.
*   **Pill Elements:** Tags, status chips, and search bars use a full pill shape (999px) to contrast against the structured grid of the content cards.

## Components

### Bottom Navigation
A fixed-bottom bar featuring four key icons: Home, Library, Agenda, and Profile. Icons use 2px stroke weights. Active states are indicated by the primary Slate Blue-Grey color.

### Cards
News and feed items are housed in rounded cards (16px). Images within cards should have a 12px internal radius. Headlines are limited to two lines to maintain vertical consistency.

### Accordions (Agendas)
Used for event listings. Headers use a subtle background tint when collapsed and clear white when expanded. The transition for the expansion must be a smooth "ease-out" lasting 250ms.

### Form Inputs
Inputs use a "floating label" style with an 8px corner radius. The border turns Primary Slate Blue-Grey on focus, with a soft 4px glow to provide clear feedback.

### Buttons
*   **Primary:** Solid Primary Slate Blue-Grey with white text.
*   **Secondary:** Muted surface-tint background with Primary color text.
*   **Tertiary:** Ghost style (no border/background) used for "Cancel" or "Dismiss" actions.