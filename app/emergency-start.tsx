"use client";

import Link from "next/link";
import ProviderDirectory from "./components/provider-directory";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

export default function EmergencyStart() {
  return (
    <main>
      <SiteHeader />

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
          <Link className="button button-dark hero-button" href="#providers">
            Find support             <span aria-hidden="true">&#8594;</span>
          </Link>
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
          <Link href="#emergency-call">
            Go to emergency call options             <span aria-hidden="true">&#8595;</span>
          </Link>
        </aside>
      </section>

      <ProviderDirectory />

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
            Demo account details stay in this browser; passwords are never
            saved. Issue and region choices are not added to your demo profile.
            Provider profiles are fictional, and emergency calls open your
            device&apos;s phone app.
          </p>
        </div>
        <Link href="#emergency-call">Back to call options <span aria-hidden="true">&#8593;</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
