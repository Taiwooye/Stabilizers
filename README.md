# Stabilizers

**Help on the move** — a small, mobile-friendly starting point for contacting
local emergency services and communicating with a dispatcher.

## What this prototype does

- Offers click-to-call links for commonly used emergency numbers in the United
  States, Canada, United Kingdom, Australia, and the European Union.
- Provides a direct emergency-call option for supported regions and does not
  store issue or region selections.
- Includes issue-based provider category filters and clearly marked sample
  profiles for preview only; accounts and provider registration are not
  connected.
- Includes sign-in, sign-up, and password-reset preview pages. Authentication
  is not connected, and these forms do not send or save account details.

## Important safety limits

Stabilizers is not a medical device or emergency service. It does not diagnose,
provide treatment instructions, dispatch an ambulance, or connect users to an
in-app clinician. Contact local emergency services directly and follow their
instructions. If a location is not listed, do not guess an emergency number;
use the phone's Emergency Call feature or an official local source.

The supported numbers are a limited prototype list and must be reviewed against
official local sources before any public launch. The app should not be used
while driving.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```

## Deploy

This project is deployed from the `Taiwooye/Stabilizers` GitHub repository to
Vercel.
