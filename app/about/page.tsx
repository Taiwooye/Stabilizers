import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "About — Stabilizers",
  description: "Learn what Stabilizers does and the limits of this preview.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="content-page">
        <p className="eyebrow">ABOUT STABILIZERS</p>
        <h1>A clearer next step when you need support.</h1>
        <p className="content-lede">
          Stabilizers is a patient-support concept designed to make it easier
          to explore the kind of professional help someone may want.
        </p>
        <div className="info-card-grid">
          <section className="info-card">
            <p className="eyebrow">FIND SUPPORT</p>
            <h2>Start with what is going on.</h2>
            <p>
              Browse issue categories and explore a fictional directory that
              can be filtered by profession.
            </p>
          </section>
          <section className="info-card">
            <p className="eyebrow">A PREVIEW, NOT A CARE SERVICE</p>
            <h2>Know what is and is not connected.</h2>
            <p>
              Demo accounts and profiles are stored or rendered locally.
              Provider credentials, availability, bookings, and consultations
              are not connected.
            </p>
          </section>
          <section className="info-card">
            <p className="eyebrow">SAFETY FIRST</p>
            <h2>Emergency help should never wait.</h2>
            <p>
              Stabilizers does not assess or treat conditions or dispatch
              emergency services. Call your local emergency number directly
              for immediate danger.
            </p>
          </section>
        </div>
        <Link className="button button-dark content-cta" href="/providers">
          Explore support <span aria-hidden="true">&#8594;</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
