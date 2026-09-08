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
A visual theme and animation style rendered by the overlay container (`'lanterns'`, `'crescent-stars'`, `'geometric'`, `'sparkles'`, `'banner'`, `'eid'`, `'eid-fitr'`, `'eid-adha'`).
_Avoid_: Style, skin, theme, visual_mode

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
