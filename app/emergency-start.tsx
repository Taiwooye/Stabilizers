"use client";

import { useState } from "react";

const regions = [
  { code: "us", name: "United States", number: "911" },
  { code: "ca", name: "Canada", number: "911" },
  { code: "uk", name: "United Kingdom", number: "999" },
  { code: "au", name: "Australia", number: "000" },
  { code: "eu", name: "European Union", number: "112" },
] as const;

const situations = [
  { id: "breathing", label: "Unresponsive or breathing concern" },
  { id: "injury", label: "Serious injury or bleeding" },
  { id: "other", label: "Another urgent situation" },
] as const;

export default function EmergencyStart() {
  const [regionCode, setRegionCode] = useState("");
  const [situation, setSituation] = useState("");
  const region = regions.find((item) => item.code === regionCode);
  const phoneNumber = region?.number.replace(/[^\d+]/g, "");

  return (
    <main>
      <header className="site-header">
        <a aria-label="Stabilizers home" className="brand" href="#">
          <span aria-hidden="true" className="brand-mark">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M4 17h6l3-8 5.2 15 3.2-9H28"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
              />
            </svg>
          </span>
          <span>
            <strong>stabilizers</strong>
            <small>HELP ON THE MOVE</small>
          </span>
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#how-it-works">How it works</a>
          <a href="#safety">Safety &amp; privacy</a>
          <a className="nav-cta" href="#get-help">
            Get help             <span aria-hidden="true">&#8599;</span>
          </a>
        </nav>
      </header>

      <section aria-labelledby="hero-title" className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span aria-hidden="true" className="eyebrow-dot" />
            A CLEAR NEXT STEP IN AN EMERGENCY
          </div>
          <h1 id="hero-title">
            Stay steady.
            <br />
            Get help moving.
          </h1>
          <p className="hero-description">
            Simple prompts to help you contact emergency services and share
            what matters while a professional guides you.
          </p>
          <a className="button button-dark hero-button" href="#get-help">
            Get emergency help             <span aria-hidden="true">&#8594;</span>
          </a>
          <p className="hero-note">
            If someone may be in immediate danger, call your local emergency
            number now.
          </p>
        </div>

        <aside aria-label="Important emergency notice" className="hero-card">
          <div aria-hidden="true" className="hero-card-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3.5 21 20H3l9-16.5Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
              <path
                d="M12 9v4.5m0 3h.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <div>
            <p className="card-kicker">PLEASE READ FIRST</p>
            <h2>This app is not emergency care.</h2>
            <p>
              Stabilizers does not assess or treat medical conditions, dispatch
              an ambulance, or connect you to an in-app clinician. Contact
              emergency services directly and follow their instructions.
            </p>
          </div>
          <a href="#get-help">
            Go to emergency call options             <span aria-hidden="true">&#8595;</span>
          </a>
        </aside>
      </section>

      <section aria-labelledby="help-title" className="help-section" id="get-help">
        <div className="section-heading">
          <div>
            <p className="eyebrow">START HERE</p>
            <h2 id="help-title">Get a professional on the line.</h2>
          </div>
          <p>
            Choose the region you are in to see a commonly used emergency
            number. If it is not listed, use your phone&apos;s emergency-call
            feature or your local official emergency number.
          </p>
        </div>

        <div className="help-grid">
          <div className="call-panel">
            <div className="panel-topline">
              <span className="live-dot" />
              DIRECT EMERGENCY CONTACT
            </div>
            <label htmlFor="region">Where are you right now?</label>
            <select
              id="region"
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

            {region && phoneNumber ? (
              <a className="button button-emergency call-button" href={`tel:${phoneNumber}`}>
                <span aria-hidden="true" className="phone-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7.2 3.5h2.3l1.2 4.1-1.6 1.7a14 14 0 0 0 5.6 5.6l1.7-1.6 4.1 1.2v2.3c0 1.1-.9 2-2 2C10 18.8 5.2 14 5.2 5.5c0-1.1.9-2 2-2Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                Call {region.number}
                <span aria-hidden="true" className="button-arrow">&#8599;</span>
              </a>
            ) : (
              <div className="call-button call-button-disabled" aria-live="polite">
                {regionCode === "other"
                  ? "Use your device's Emergency Call option"
                  : "Select your region for a call option"}
              </div>
            )}

            <p className="call-caption">
              Calls are placed by your device. Check that the selected region
              matches your current location.
            </p>
            {!region && (
              <p className="not-listed">
                <strong>Not listed or unsure?</strong> Don&apos;t guess. Use
                your device&apos;s Emergency Call option or contact the local
                emergency service using an official source.
              </p>
            )}
          </div>

          <div aria-labelledby="dispatcher-title" className="dispatcher-panel">
            <p className="eyebrow">WHEN THEY ANSWER</p>
            <h3 id="dispatcher-title">You only need to start with the basics.</h3>
            <div aria-label="Choose what best describes the situation" className="situation-list">
              {situations.map((item) => (
                <button
                  aria-pressed={situation === item.id}
                  className={`situation-option${situation === item.id ? " selected" : ""}`}
                  key={item.id}
                  onClick={() => setSituation(item.id)}
                  type="button"
                >
                  <span aria-hidden="true" className="radio-mark" />
                  {item.label}
                </button>
              ))}
            </div>
            <div aria-live="polite" className="say-this">
              <span className="say-label">YOU CAN SAY</span>
              <p>
                &quot;I need urgent help. I&apos;m at <strong>your exact location</strong>.
                {situation && " I can tell you what is happening."}&quot;
              </p>
            </div>
            <p className="dispatcher-reminder">
              Tell them where you are and what happened. Follow the
              professional&apos;s instructions, and let them know if anything
              changes.
            </p>
          </div>
        </div>
        <p className="driving-note">
          <span aria-hidden="true">!</span>
          Already heading to hospital? Ask a passenger to contact emergency
          services for guidance. If you are driving, do not use this app while
          moving; ask a passenger or pull over safely first.
        </p>
      </section>

      <section aria-labelledby="steps-title" className="steps-section" id="how-it-works">
        <div className="steps-intro">
          <p className="eyebrow">ONE STEP AT A TIME</p>
          <h2 id="steps-title">A little structure for a stressful moment.</h2>
          <p>
            The emergency professional is in charge. These reminders help you
            communicate clearly while you wait for their guidance.
          </p>
        </div>
        <ol className="steps-list">
          <li>
            <span className="step-number">01</span>
            <div>
              <h3>Call local emergency services</h3>
              <p>Use the number for your current location. Don&apos;t delay the call to use this app.</p>
            </div>
          </li>
          <li>
            <span className="step-number">02</span>
            <div>
              <h3>Share the essentials</h3>
              <p>Give your exact location and describe what happened as clearly as you can.</p>
            </div>
          </li>
          <li>
            <span className="step-number">03</span>
            <div>
              <h3>Stay safe and follow directions</h3>
              <p>Keep the line open if asked. Avoid moving the person unless there is immediate danger or the dispatcher directs you.</p>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="safety-title" className="safety-section" id="safety">
        <div className="safety-symbol" aria-hidden="true">&#10003;</div>
        <div>
          <p className="eyebrow">BUILT FOR CLARITY</p>
          <h2 id="safety-title">Your privacy matters, especially here.</h2>
          <p>
            This prototype does not ask for your name, location, or health
            details, and it does not save what you select. The call option
            opens your device&apos;s phone app; Stabilizers does not receive or
            place the call.
          </p>
        </div>
        <a href="#get-help">Back to call options <span aria-hidden="true">&#8593;</span></a>
      </section>

      <footer className="site-footer">
        <a aria-label="Stabilizers home" className="brand footer-brand" href="#">
          <span aria-hidden="true" className="brand-mark">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M4 17h6l3-8 5.2 15 3.2-9H28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            </svg>
          </span>
          <span><strong>stabilizers</strong><small>HELP ON THE MOVE</small></span>
        </a>
        <p>Not a substitute for emergency services or professional medical advice.</p>
        <a href="#safety">Safety &amp; privacy</a>
      </footer>
    </main>
  );
}
