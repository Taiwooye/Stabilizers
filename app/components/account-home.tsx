"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import CallModeIcons from "./call-mode-icons";
import {
  endDemoSession,
  getDemoSessionSnapshot,
  getServerDemoSessionSnapshot,
  subscribeToDemoSession,
} from "./demo-auth";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function AccountHome() {
  const session = useSyncExternalStore(
    subscribeToDemoSession,
    getDemoSessionSnapshot,
    getServerDemoSessionSnapshot,
  );
  const [status, setStatus] = useState("");

  function signOut() {
    try {
      endDemoSession();
      setStatus("");
    } catch {
      setStatus("Could not sign out in this browser. Please try again.");
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="content-page account-page">
        <p className="eyebrow">YOUR STABILIZERS ACCOUNT</p>
        {session.account ? (
          <>
            <h1>Welcome, {session.account.name}.</h1>
            <p className="content-lede">
              Your demo account is ready. Choose an issue to browse the sample
              directory and explore the patient flow.
            </p>
            <section className="account-summary" aria-label="Demo account details">
              <div>
                <span>Demo account email</span>
                <strong>{session.account.email}</strong>
              </div>
              <span className="sample-badge">Stored in this browser only</span>
            </section>
            <h2 className="account-section-title">Browse support</h2>
            <div className="support-card-grid">
              <Link className="support-card" href="/providers?issue=emotional">
                <strong>Emotional wellbeing</strong>
                <span>Therapists, counselors and more</span>
              </Link>
              <Link className="support-card" href="/providers?issue=medical">
                <strong>General health</strong>
                <span>Doctors, nurses and more</span>
              </Link>
              <Link className="support-card" href="/providers?issue=recovery">
                <strong>Recovery and movement</strong>
                <span>Rehabilitation and nutrition support</span>
              </Link>
              <Link className="support-card" href="/providers?issue=family">
                <strong>Family and day-to-day support</strong>
                <span>Community and care coordination</span>
              </Link>
            </div>
            <section className="call-preview-panel">
              <div>
                <p className="eyebrow">CALL OPTIONS PREVIEW</p>
                <h2>Audio and video icons</h2>
                <p>
                  These are visual placeholders only. Audio and video calls
                  aren&apos;t connected in this demo.
                </p>
              </div>
              <CallModeIcons />
            </section>
            <button className="provider-sign-out" onClick={signOut} type="button">
              Sign out
            </button>
          </>
        ) : (
          <>
            <h1>Sign in to your demo account.</h1>
            <p className="content-lede">
              Create a demo account or sign in with the fake email you used
              before to continue exploring.
            </p>
            <div className="account-actions">
              <Link className="button button-dark" href="/sign-in">
                Sign in
              </Link>
              <Link className="provider-sign-in-link" href="/sign-up">
                Create a demo account
              </Link>
            </div>
            {session.error && (
              <p className="provider-session-error" role="alert">{session.error}</p>
            )}
          </>
        )}
        {status && <p className="provider-session-error" role="alert">{status}</p>}
      </main>
      <SiteFooter />
    </>
  );
}
