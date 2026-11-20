"use client";

import { useState } from "react";

const regions = [
  { code: "us", name: "United States", number: "911" },
  { code: "ca", name: "Canada", number: "911" },
  { code: "uk", name: "United Kingdom", number: "999" },
  { code: "au", name: "Australia", number: "000" },
  { code: "eu", name: "European Union", number: "112" },
] as const;

export default function EmergencyCallBanner() {
  const [regionCode, setRegionCode] = useState("");
  const region = regions.find((item) => item.code === regionCode);

  return (
    <div aria-labelledby="emergency-title" className="emergency-banner" id="emergency-call">
      <div className="emergency-banner-copy">
        <span aria-hidden="true" className="emergency-alert-mark">!</span>
        <div>
          <p className="eyebrow">NEED HELP RIGHT NOW?</p>
          <h2 id="emergency-title">Call emergency services for an emergency.</h2>
          <p>
            If someone has collapsed, is unresponsive, or is bleeding heavily,
            call your local emergency number now. Don&apos;t wait for a provider
            listing or sign in. Stabilizers is not an emergency service.
          </p>
        </div>
      </div>
      <div className="emergency-call-controls">
        <label htmlFor="emergency-region">Your current location</label>
        <select
          id="emergency-region"
          onChange={(event) => setRegionCode(event.target.value)}
          value={regionCode}
        >
          <option value="">Select a region</option>
          {regions.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name} — {item.number}
            </option>
          ))}
          <option value="other">Other / not listed</option>
        </select>
        <p className="emergency-call-caption" aria-live="polite">
          {region
            ? "Check that this matches your current location before calling."
            : "If your region is not listed, use your device's Emergency Call option or an official local source."}
        </p>
        {region && (
          <a
            className="button button-emergency emergency-call-button"
            href={`tel:${region.number.replace(/[^\d+]/g, "")}`}
          >
            Call {region.number} <span aria-hidden="true">&#8599;</span>
          </a>
        )}
      </div>
    </div>
  );
}
