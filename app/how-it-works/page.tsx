import type { Metadata } from "next";
import Link from "next/link";
import CallModeIcons from "../components/call-mode-icons";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "How it works — Stabilizers",
  description: "See how the Stabilizers patient-support preview works.",
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="content-page">
        <p className="eyebrow">HOW IT WORKS</p>
        <h1>A simple path from a concern to the right kind of support.</h1>
        <p className="content-lede">
          This preview demonstrates how patients can explore care options.
          It does not provide medical advice or connect patients to clinicians.
        </p>
        <ol className="journey-list">
          <li>
            <span className="step-number">01</span>
            <div>
              <h2>Choose an issue</h2>
              <p>
                Start with emotional wellbeing, general health, recovery, or
                family and day-to-day support.
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">02</span>
            <div>
              <h2>Create a demo account</h2>
              <p>
                Use a made-up name and email to test the sign-up and sign-in
                flow. The demo never stores a password.
              </p>
            </div>
          </li>
          <li>
            <span className="step-number">03</span>
            <div>
              <h2>Filter example profiles</h2>
              <p>
                Browse fictional profiles by profession and issue. They cannot
                be contacted, booked, or verified in this preview.
              </p>
            </div>
          </li>
        </ol>
        <section className="call-preview-panel">
          <div>
            <p className="eyebrow">CALL OPTIONS PREVIEW</p>
            <h2>Audio and video icons</h2>
            <p>
              Audio and video calling are planned interface options. The icons
              are visual only and no calls can be placed here.
            </p>
          </div>
          <CallModeIcons />
        </section>
        <p className="content-safety-note">
          If someone may be in immediate danger, call local emergency services
          now. Do not wait for account access or browse profiles.
        </p>
        <Link className="button button-dark content-cta" href="/providers">
          Browse support options <span aria-hidden="true">&#8594;</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
