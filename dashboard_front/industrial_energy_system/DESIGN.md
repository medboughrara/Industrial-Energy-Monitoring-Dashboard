---
name: Industrial Energy System
colors:
  surface: '#151311'
  surface-dim: '#151311'
  surface-bright: '#3b3936'
  surface-container-lowest: '#0f0e0c'
  surface-container-low: '#1d1b19'
  surface-container: '#211f1d'
  surface-container-high: '#2c2a27'
  surface-container-highest: '#363432'
  on-surface: '#e7e1dd'
  on-surface-variant: '#cec5b9'
  inverse-surface: '#e7e1dd'
  inverse-on-surface: '#32302d'
  outline: '#979084'
  outline-variant: '#4b463d'
  surface-tint: '#d6c5a4'
  primary: '#d7c6a6'
  on-primary: '#392f18'
  primary-container: '#bbab8c'
  on-primary-container: '#4a3f27'
  inverse-primary: '#6a5d43'
  secondary: '#d3c4b3'
  on-secondary: '#382f23'
  secondary-container: '#52473b'
  on-secondary-container: '#c5b6a6'
  tertiary: '#c7c6dc'
  on-tertiary: '#2e2f40'
  tertiary-container: '#ababc0'
  on-tertiary-container: '#3e3f51'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f2e1bf'
  primary-fixed-dim: '#d6c5a4'
  on-primary-fixed: '#231a06'
  on-primary-fixed-variant: '#51452d'
  secondary-fixed: '#f0e0cf'
  secondary-fixed-dim: '#d3c4b3'
  on-secondary-fixed: '#221a10'
  on-secondary-fixed-variant: '#4f4539'
  tertiary-fixed: '#e1e0f7'
  tertiary-fixed-dim: '#c5c5da'
  on-tertiary-fixed: '#191a2a'
  on-tertiary-fixed-variant: '#444557'
  background: '#151311'
  on-background: '#e7e1dd'
  surface-variant: '#363432'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  kpi-value:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: -0.01em
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style
This design system is engineered for high-stakes industrial environments where data precision and operational uptime are critical. The aesthetic is rooted in **Corporate Modernism**, prioritizing functional clarity over decorative flair. The interface utilizes a high-contrast dark theme to reduce eye strain during long monitoring shifts while highlighting critical energy metrics. 

The personality is reliable, precise, and authoritative. By employing a flat design language, the system removes visual noise, ensuring that energy fluctuations and equipment alerts are immediately identifiable. The interaction model is designed for efficiency, favoring density and immediate access to real-time data over expansive white space.

## Colors
The palette is anchored by **Deep Charcoal (#282A3A)**, providing a stable, low-light base for industrial dashboards. **Sage-tan (#BBAB8C)** serves as the primary action and highlight color, specifically reserved for critical KPI containers and primary status indicators to ensure they pop against the dark background.

**Muted Bronze (#776B5D)** is used for secondary data visualizations and historical trend lines, offering a sophisticated distinction from real-time data. Semantic colors for alerts (Success/Error) are desaturated to maintain harmony with the earth-toned palette while remaining functional for status reporting.

## Typography
This design system utilizes **Inter** for its exceptional legibility in data-heavy contexts. The typographic hierarchy is structured to support rapid scanning of numerical values. 

A specific "kpi-value" style is defined for high-level energy metrics, while "data-tabular" ensures that columns of numbers in tables and charts remain perfectly aligned for comparison. Headings are kept compact to maximize screen real estate, and labels utilize a slight letter-spacing increase and uppercase styling to differentiate them from dynamic data points.

## Layout & Spacing
The layout follows a **fluid grid** model, allowing dashboards to scale across industrial control room monitors and ruggedized tablets. A 12-column system is used for the main content area, while a fixed 260px sidebar handles primary navigation.

The spacing rhythm is based on an **8px linear scale**, ensuring mathematical consistency across all components. High-density views (like sensor logs) may utilize the 4px (xs) increment, while high-level summaries utilize 24px (lg) margins to provide necessary visual breathing room between disparate data sets.

## Elevation & Depth
This design system employs **Tonal Layering** rather than traditional shadows to maintain a flat, professional aesthetic. Depth is communicated through color shifts in the charcoal spectrum.

- **Level 0 (Background):** #282A3A - The foundation for the entire application.
- **Level 1 (Cards/Sidebars):** #323546 - Subtle lifting for primary containers.
- **Level 2 (Modals/Overlays):** #3F4254 - Used for temporary diagnostic windows.

Borders are used sparingly as "low-contrast outlines" (1px solid with 10% white opacity) to define boundaries without adding visual weight. This creates a "precision-milled" look suitable for industrial software.

## Shapes
The shape language is **Soft (0.25rem)**. This subtle rounding of corners strikes a balance between the rigid, "engineered" feel of sharp corners and the overly friendly appearance of pill-shaped UI. 

Small components like checkboxes and tags use the base 4px radius. Larger containers, such as KPI cards and main dashboard panels, may use the "rounded-lg" (8px) variant to create a clear structural hierarchy. Buttons are consistently rectangular with the 4px radius to reinforce a sense of stability and intent.

## Components
### KPI Cards
The hallmark of this design system. KPI cards use the **#BBAB8C (Sage-tan)** background with dark text (#282A3A) for maximum impact. They should feature a large "kpi-value" and a "label-sm" to describe the metric.

### Real-time Charts
Charts are rendered on a dark surface. The primary data path uses **#776B5D (Muted Bronze)** with a 2px line weight. Grid lines should be subtle, utilizing the background color with 5% white overlay. Area charts should use a gradient fade from the bronze line down into the charcoal background.

### Buttons
- **Primary:** Sage-tan background with charcoal text.
- **Secondary:** Transparent background with a Muted Bronze border and bronze text.
- **Destructive:** Solid red (#E63946) with white text, used only for "Stop" or "Emergency" actions.

### Sidebar & Navigation
The sidebar is a dark-themed vertical strip using a slightly lighter shade of charcoal than the background (#323546). Icons should be monolinear and geometric, utilizing Sage-tan for the active state indicator.

### Input Fields
Inputs use a dark fill (#1E1F29) with a 1px border. On focus, the border transitions to Sage-tan. Text inside inputs must maintain high contrast to ensure legibility in low-light factory environments.