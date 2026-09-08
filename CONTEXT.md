# ramadan-overlay

A lightweight, framework-agnostic decoration overlay that automatically displays festive visual decorations during Islamic holidays.

## Language

**Occasion**:
An Islamic holiday or period observed by the overlay (`'ramadan'`, `'eid-fitr'`, `'eid-adha'`, or `'none'`).
_Avoid_: Holiday, event, festival, celebration_type

**Ramadan**:
The ninth month of the Islamic lunar calendar, during which daily fasting is observed.
_Avoid_: Fasting month, Ramazan

**Eid Al-Fitr**:
The Islamic holiday celebrated on the first three days of Shawwal (Hijri month 10) marking the end of Ramadan.
_Avoid_: Lesser Eid, Sweet Eid, Eid Feast

**Eid Al-Adha**:
The Islamic holiday celebrated from the 10th through 13th of Dhu al-Hijjah (Hijri month 12) during the annual Hajj pilgrimage.
_Avoid_: Greater Eid, Feast of Sacrifice, Bakrid

**Overlay Variant**:
The structural decoration layout and animation shape rendered by the overlay container (`'lanterns'`, `'crescent-stars'`, `'geometric'`, `'sparkles'`, `'banner'`, `'eid'`, `'eid-fitr'`, `'eid-adha'`).
_Avoid_: Style, skin, visual_mode (distinguish from Visual Theme)

**Visual Theme**:
A curated cultural color palette and CSS token set applied to overlay elements and widgets (`'classic'`, `'midnight'`, `'emerald'`, `'royal'`, `'desert-dusk'`, or a custom `ThemeDefinition`). Distinct from Overlay Variant which dictates DOM geometry and animation physics.
_Avoid_: Skin, style pack, color template

**Theme Preset**:
One of the five ratified, built-in visual color harmonies shipped with the core library (`'classic'`, `'midnight'`, `'emerald'`, `'royal'`, `'desert-dusk'`).
_Avoid_: Built-in palette, default colorway, stock style

**Hijri Adjustment**:
A day offset applied to the base astronomical calendar to reconcile regional moon-sighting variations.
_Avoid_: Timezone offset, date shift, calendar delta

**Alert Window**:
The time interval immediately preceding Iftar (defaulting to 30 minutes) during which the countdown widget becomes visible.
_Avoid_: Active window, display period

**Countdown Host**:
A standalone floating DOM element (`<aside id="ramadan-countdown-root">`) mounted directly to `document.body` with native pointer events and accessibility tree exposure.
_Avoid_: Overlay child, timer container, popup root

**Countdown Card**:
The visual UI card containing tabular countdown digits, festive header, target timestamp, and interactive controls.
_Avoid_: Timer box, countdown modal, alert popup

**Iftar**:
The sunset meal marking the end of the daily fast during Ramadan.
_Avoid_: Fast-breaking, breakfast, Maghrib meal

**Iftar Time Resolver**:
A dynamic callback function or static definition that provides the target Iftar time for a given calendar date.
_Avoid_: Time calculator, sunset provider

**Dormant Scheduler**:
The low-power single-timeout scheduling mechanism that arms until the alert window threshold without executing active per-second ticks.
_Avoid_: Sleeping timer, long interval, background polling

**Active Tick Loop**:
The self-correcting 1-second timing cycle that drives countdown digit rendering and tab-visibility resynchronization.
_Avoid_: Animation frame, second ticker, interval loop

**Ambient Audio Controller**:
The lifecycle manager for audio alert playback and priming, wrapping `HTMLAudioElement` with zero-throw browser autoplay policy enforcement.
_Avoid_: Audio player, sound manager, chime player

**Celebration Flare**:
The festive sensory sequence (confetti burst, celebratory card styling, and audio chime alert) triggered at T-0 upon reaching Iftar.
_Avoid_: Celebration effect, party mode, alert explosion

**Milestone Live Region**:
An accessible `aria-live="polite"` DOM element that broadcasts human-readable countdown updates at discrete temporal milestones (entry, 15m, 5m, 1m, and T-0) to avoid screen reader speech queue flooding.
_Avoid_: Ticker region, live timer, speech queue

**Error Containment Boundary**:
The outermost defensive execution perimeter wrapping public lifecycle methods (`init()`, `update()`, `setTheme()`), ensuring unexpected runtime exceptions never crash the host application.
_Avoid_: Error handler, try-catch block, catch-all

**Safe No-Op Instance**:
An infallible fallback object returned upon catastrophic initialization failure, implementing the complete `OverlayInstance` contract with inert methods (`() => undefined` / `() => null`) and immutable dormant state.
_Avoid_: Empty overlay, stub instance, dummy object

**Atomic DOM Rollback**:
The deterministic cleanup procedure that instantly removes partially injected `<style>` elements and host containers from the DOM when initialization fails mid-flight, leaving zero orphaned nodes.
_Avoid_: DOM wipe, error teardown, element clearing

**Telemetry Hook**:
An isolated consumer callback (`onError?: (error: unknown) => void`) invoked upon initialization or runtime failure, protected by double-containment to prevent secondary crashes.
_Avoid_: Error listener, crash reporter, failure event

**Diagnostic Logger**:
The internal, prefix-standardized developer notice mechanism that activates in development or debug mode to explain dormant states (e.g. `autoTrigger` outside Ramadan/Eid) while maintaining complete silence in production.
_Avoid_: Console wrapper, debug printer, log util
