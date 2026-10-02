# Neptune Beach case study

## Evidence used

- Neptune Beach Research White Paper (1).pdf, pages 1–3: 160 available spaces; 90% car-centric trips across Neptune Beach; dynamic pricing and flexible curbside recommendations; no estimated rate amounts; higher-cost technology alternatives.
- Fall22 Presentation.pptx, slides 2, 7, 9, 13: William credited with proposed management solutions; teammates credited with dashboards; paid-duration presence definition; dashboard deliverable; pricing and curbside tradeoffs. One or two designated bays in slides, compared with two or three in the paper.
- R Analysis Summary (Spring 22).pdf, pages 1–3: earlier team research predating William's stated engagement; March-only scope due to earlier geotagging problems; same-day reload handling; about 140 minutes of paid duration, expressly not observed dwell time. Conflicting one-time visitor totals (13,845 vs. 11,912) are excluded.
- Citation Data Build.docx: dashboard preparation and dimensions. Its 60/40 paid/unpaid snapshot is not used as an occupancy or behavioral input.

Original documents are not published, avoiding exposure of individual records and other personal data in screenshots. The site provides source notes rather than distributing raw files. Citywide trip estimates are never presented as demand at the 160-space location. Presence estimates in the dashboard chart exceed 160 in places and may cover a different footprint or overlapping paid time; these are not mapped to the simulated lot.

## Simulation

A deterministic, hypothetical four-hour parking scenario starts empty. Both alternatives receive the same constant arrivals (default 90/hour, adjustable 30–120). Baseline dwell is 140 minutes, inspired by paid duration, not calibrated from observed occupancy. Proposal dwell is adjustable 60–180 minutes. Between zero and three spaces may be reserved for loading, reducing general capacity. Both alternatives default to identical assumptions.

Departures free spaces before arrivals are allocated each minute. Unaccommodated arrivals leave the model. It does not simulate queuing, searching, price elasticity, actual geography, delivery use, safety, or revenue. A 110-minute stay and two reserved bays are an explicit user-selected example, not a predicted effect of pricing.

The model's unit tests check conservation of arrivals, capacity limits, identical scenarios, zero demand, shorter stays under pressure, the opportunity cost of reserved bays, and invalid inputs. Browser checks cover desktop/mobile deep links, presets, playback, reset, and closing the study.

## Data needed to calibrate a future version

Use de-identified, aggregated data only: arrivals by time interval and location, actual occupancy counts, observed dwell-time distribution, rates by time/date, and capacity mapped to the same parking footprint. Before/after pilot data and dates are needed for a measured comparison. Do not share plate numbers, payment details, or other individual identifiers. Paid-duration records alone do not establish demand response or actual occupancy.
