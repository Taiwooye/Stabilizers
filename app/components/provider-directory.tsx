"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  endDemoSession,
  getDemoSessionSnapshot,
  getServerDemoSessionSnapshot,
  subscribeToDemoSession,
  type DemoAccount,
} from "./demo-auth";
import CallModeIcons from "./call-mode-icons";

const issues = [
  {
    id: "emotional",
    label: "Anger, stress or emotional wellbeing",
    description: "Therapists, counselors and mental health professionals.",
  },
  {
    id: "medical",
    label: "General health or a non-emergency concern",
    description: "Doctors, nurses and general health professionals.",
  },
  {
    id: "recovery",
    label: "Movement, recovery or nutrition",
    description: "Rehabilitation and day-to-day health support.",
  },
  {
    id: "family",
    label: "Family or day-to-day support",
    description: "Family, community and care coordination.",
  },
] as const;

type IssueId = (typeof issues)[number]["id"];

type DemoProvider = {
  id: string;
  name: string;
  profession: string;
  focus: string;
  issues: IssueId[];
};

const sampleProviders: DemoProvider[] = [
  { id: "demo-01", name: "Demo Profile 01", profession: "Therapist", focus: "Anger management", issues: ["emotional"] },
  { id: "demo-02", name: "Demo Profile 02", profession: "Counselor", focus: "Stress and coping", issues: ["emotional", "family"] },
  { id: "demo-03", name: "Demo Profile 03", profession: "Clinical psychologist", focus: "Emotional wellbeing", issues: ["emotional"] },
  { id: "demo-04", name: "Demo Profile 04", profession: "Psychiatrist", focus: "Mental health", issues: ["emotional", "medical"] },
  { id: "demo-05", name: "Demo Profile 05", profession: "Social worker", focus: "Community and family support", issues: ["emotional", "family"] },
  { id: "demo-06", name: "Demo Profile 06", profession: "Psychotherapist", focus: "Emotional support", issues: ["emotional"] },
  { id: "demo-07", name: "Demo Profile 07", profession: "Family therapist", focus: "Family relationships", issues: ["emotional", "family"] },
  { id: "demo-08", name: "Demo Profile 08", profession: "Anger-management counselor", focus: "Managing anger", issues: ["emotional"] },
  { id: "demo-09", name: "Demo Profile 09", profession: "General practitioner", focus: "Everyday health", issues: ["medical"] },
  { id: "demo-10", name: "Demo Profile 10", profession: "Family doctor", focus: "General health", issues: ["medical", "family"] },
  { id: "demo-11", name: "Demo Profile 11", profession: "Registered nurse", focus: "Nursing care", issues: ["medical"] },
  { id: "demo-12", name: "Demo Profile 12", profession: "Nurse practitioner", focus: "Primary care", issues: ["medical"] },
  { id: "demo-13", name: "Demo Profile 13", profession: "Pediatric nurse", focus: "Child health", issues: ["medical", "family"] },
  { id: "demo-14", name: "Demo Profile 14", profession: "Community health worker", focus: "Community wellbeing", issues: ["medical", "family"] },
  { id: "demo-15", name: "Demo Profile 15", profession: "Physical therapist", focus: "Movement and recovery", issues: ["recovery"] },
  { id: "demo-16", name: "Demo Profile 16", profession: "Occupational therapist", focus: "Everyday activities", issues: ["recovery", "family"] },
  { id: "demo-17", name: "Demo Profile 17", profession: "Dietitian", focus: "Nutrition", issues: ["recovery", "medical"] },
  { id: "demo-18", name: "Demo Profile 18", profession: "Pharmacist", focus: "Medication questions", issues: ["medical", "recovery"] },
  { id: "demo-19", name: "Demo Profile 19", profession: "Speech therapist", focus: "Communication support", issues: ["recovery", "family"] },
  { id: "demo-20", name: "Demo Profile 20", profession: "Care coordinator", focus: "Care planning", issues: ["family", "recovery"] },
];

function isIssueId(value: string | null): value is IssueId {
  return issues.some((issue) => issue.id === value);
}

function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getLocationIssue() {
  return new URLSearchParams(window.location.search).get("issue") ?? "";
}

function getServerLocationIssue() {
  return "";
}

export default function ProviderDirectory() {
  const [chosenIssueId, setChosenIssueId] = useState<IssueId | "">("");
  const [providerType, setProviderType] = useState("all");
  const [accountActionError, setAccountActionError] = useState("");
  const session = useSyncExternalStore(
    subscribeToDemoSession,
    getDemoSessionSnapshot,
    getServerDemoSessionSnapshot,
  );
  const locationIssue = useSyncExternalStore(
    subscribeToLocation,
    getLocationIssue,
    getServerLocationIssue,
  );
  const demoAccount: DemoAccount | null = session.account;
  const issueId = chosenIssueId || (isIssueId(locationIssue) ? locationIssue : "");

  const selectedIssue = issues.find((issue) => issue.id === issueId);
  const issueProviders = selectedIssue
    ? sampleProviders.filter((provider) => provider.issues.includes(selectedIssue.id))
    : [];
  const providerTypes = Array.from(
    new Set(issueProviders.map((provider) => provider.profession)),
  );
  const providers = issueProviders.filter(
    (provider) => providerType === "all" || provider.profession === providerType,
  );

  function chooseIssue(id: IssueId) {
    setChosenIssueId(id);
    setProviderType("all");
  }

  return (
    <section aria-labelledby="providers-title" className="providers-section" id="providers">
      <div className="providers-heading">
        <p className="eyebrow">FIND THE RIGHT KIND OF SUPPORT</p>
        <h2 id="providers-title">What kind of help are you looking for?</h2>
        <p>
          Choose an issue to see the kind of professional who may be relevant.
          Fake demo account details stay in this browser. Profiles are examples
          only, not a real care service.
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

      {(session.error || accountActionError) && (
        <p className="provider-session-error" role="alert">
          {session.error || accountActionError}
        </p>
      )}

      {selectedIssue && (
        <div aria-live="polite" className="provider-gate">
          {!demoAccount ? (
            <div className="provider-gate-copy provider-gate-copy-locked">
              <p className="eyebrow">SIGN IN TO BROWSE DEMO PROFILES</p>
              <h3>See example matches for {selectedIssue.label.toLowerCase()}</h3>
              <p>
                Create a local demo account or sign in with one you already
                created. Use fake information only.
              </p>
              <div className="provider-auth-links">
                <Link
                  className="button button-dark"
                  href={`/sign-up?issue=${selectedIssue.id}`}
                >
                  Create demo account
                </Link>
                <Link
                  className="provider-sign-in-link"
                  href={`/sign-in?issue=${selectedIssue.id}`}
                >
                  Sign in
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="provider-gate-copy">
                <p className="eyebrow">DEMO ACCOUNT</p>
                <h3>Welcome, {demoAccount.name}</h3>
                <p>
                  Signed in as {demoAccount.email}. These sample profiles are
                  fictional and cannot be contacted or booked.
                </p>
                <button
                  className="provider-sign-out"
                  onClick={() => {
                    try {
                      endDemoSession();
                      setProviderType("all");
                      setAccountActionError("");
                    } catch {
                      setAccountActionError("Could not sign out of this demo account.");
                    }
                  }}
                  type="button"
                >
                  Sign out
                </button>
              </div>

              <div className="sample-directory">
                <div className="sample-directory-heading">
                  <div>
                    <p className="eyebrow">DEMO DIRECTORY</p>
                    <h3>{providers.length} sample matches</h3>
                  </div>
                  <span className="sample-badge">Fictional profiles</span>
                </div>
                <p className="sample-disclaimer">
                  These fictional profiles are not registered providers and have
                  no availability, contact details, or booking.
                </p>
                <label htmlFor="provider-type">Filter by professional type</label>
                <select
                  id="provider-type"
                  onChange={(event) => setProviderType(event.target.value)}
                  value={providerType}
                >
                  <option value="all">All types</option>
                  {providerTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ul className="sample-provider-list">
                  {providers.map((provider) => (
                    <li className="sample-provider" key={provider.id}>
                      <span aria-hidden="true" className="sample-provider-mark">
                        {provider.profession.slice(0, 1)}
                      </span>
                      <span>
                        <strong>{provider.name}</strong>
                        <small>{provider.profession} · {provider.focus}</small>
                        <small>Fictional profile · not registered or available</small>
                        <CallModeIcons />
                      </span>
                      <span className="sample-provider-type">{provider.profession}</span>
                    </li>
                  ))}
                  {providers.length === 0 && (
                    <li className="sample-empty">No sample profiles match this filter.</li>
                  )}
                </ul>
              </div>
            </>
          )}
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
