"use client";

import Link from "next/link";
import { useState } from "react";

const regions = [
  { code: "us", name: "United States", number: "911" },
  { code: "ca", name: "Canada", number: "911" },
  { code: "uk", name: "United Kingdom", number: "999" },
  { code: "au", name: "Australia", number: "000" },
  { code: "eu", name: "European Union", number: "112" },
] as const;

const issues = [
  {
    id: "emotional",
    label: "Anger, stress or emotional wellbeing",
    description: "Explore therapist and counselor support.",
    providerTypes: ["Therapist", "Counselor"],
  },
  {
    id: "medical",
    label: "General health or a non-emergency concern",
    description: "Explore doctor and nurse support.",
    providerTypes: ["Doctor", "Nurse"],
  },
] as const;

const sampleProviders = [
  { id: "therapist", issue: "emotional", type: "Therapist" },
  { id: "counselor", issue: "emotional", type: "Counselor" },
  { id: "doctor", issue: "medical", type: "Doctor" },
  { id: "nurse", issue: "medical", type: "Nurse" },
] as const;

type IssueId = (typeof issues)[number]["id"];

export default function ProviderDirectory() {
  const [regionCode, setRegionCode] = useState("");
  const [issueId, setIssueId] = useState<IssueId | "">("");
  const [providerType, setProviderType] = useState("all");

  const region = regions.find((item) => item.code === regionCode);
  const selectedIssue = issues.find((item) => item.id === issueId);
  const providers = sampleProviders.filter(
    (provider) =>
      provider.issue === issueId &&
      (providerType === "all" || provider.type === providerType),
  );

  function chooseIssue(id: IssueId) {
    setIssueId(id);
    setProviderType("all");
  }

  return (
    <section aria-labelledby="providers-title" className="providers-section" id="providers">
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
          {region ? (
            <p className="emergency-call-caption" aria-live="polite">
              Use your device&apos;s Emergency Call option or an official local
              source; don&apos;t guess an emergency number.
            </p>
          ) : regionCode === "other" ? (
            <p className="emergency-call-caption" aria-live="polite">
              Use your device&apos;s Emergency Call option or an official local
              source; don&apos;t guess an emergency number.
            </p>
          ) : (
            <p className="emergency-call-caption" aria-live="polite">
              Select your current region to see its emergency call option.
            </p>
          )}
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

      <div className="providers-heading">
        <p className="eyebrow">FIND THE RIGHT KIND OF SUPPORT</p>
        <h2 id="providers-title">What kind of help are you looking for?</h2>
        <p>
          Choose an issue to see the kind of professional who may be relevant.
          Provider browsing and accounts are demonstration-only and are not
          connected to a real care service.
        </p>
      </div>

      <div aria-label="Choose a type of support" className="issue-grid">
        {issues.map((issue) => (
          <button
            aria-pressed={issueId === issue.id}
            className={`issue-option${issueId === issue.id ? " selected" : ""}`}
            key={issue.id}
            onClick={() => chooseIssue(issue.id)}
            type="button"
          >
            <span className="issue-option-title">{issue.label}</span>
            <span className="issue-option-description">{issue.description}</span>
            <span aria-hidden="true" className="issue-option-arrow">&#8594;</span>
          </button>
        ))}
      </div>

      {selectedIssue && (
        <div aria-live="polite" className="provider-gate">
          <div className="provider-gate-copy">
            <p className="eyebrow">ACCOUNT REQUIRED FOR A REAL DIRECTORY</p>
            <h3>
              Browse{" "}
              {selectedIssue.providerTypes
                .map((type) => `${type.toLowerCase()}s`)
                .join(" and ")}{" "}
              by issue
            </h3>
            <p>
              Create an account or sign in to browse providers. Account access
              and verified provider listings are not connected in this preview.
            </p>
            <div className="provider-auth-links">
              <Link className="button button-dark" href="/sign-up">
                Create account
              </Link>
              <Link className="provider-sign-in-link" href="/sign-in">
                Sign in
              </Link>
            </div>
          </div>

          <div className="sample-directory">
            <div className="sample-directory-heading">
              <div>
                <p className="eyebrow">DEMO ONLY</p>
                <h3>Preview sample matches</h3>
              </div>
              <span className="sample-badge">Not real providers</span>
            </div>
            <p className="sample-disclaimer">
              These examples are not registered or available professionals.
              They have no contact details and cannot be booked.
            </p>
            <label htmlFor="provider-type">Filter by professional type</label>
            <select
              id="provider-type"
              onChange={(event) => setProviderType(event.target.value)}
              value={providerType}
            >
              <option value="all">All types</option>
              {selectedIssue.providerTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ul className="sample-provider-list">
              {providers.map((provider) => (
                <li className="sample-provider" key={provider.id}>
                  <span aria-hidden="true" className="sample-provider-mark">
                    {provider.type.slice(0, 1)}
                  </span>
                  <span>
                    <strong>Example {provider.type.toLowerCase()}</strong>
                    <small>Sample profile · not registered or available</small>
                  </span>
                  <span className="sample-provider-type">{provider.type}</span>
                </li>
              ))}
              {providers.length === 0 && (
                <li className="sample-empty">No sample profiles match this filter.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <p className="providers-safety-note">
        <span aria-hidden="true">!</span>
        For immediate danger, call emergency services directly. Do not wait for
        account access or a provider listing.
      </p>
    </section>
  );
}
