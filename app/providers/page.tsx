import type { Metadata } from "next";
import EmergencyCallBanner from "../components/emergency-call-banner";
import ProviderDirectory from "../components/provider-directory";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "Find support — Stabilizers",
  description: "Browse the fictional provider directory in the Stabilizers demo.",
};

export default function ProvidersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="providers-page-intro">
          <p className="eyebrow">PATIENT SUPPORT</p>
          <h1>Find support that fits your needs.</h1>
          <p>
            Choose an issue, sign in to your demo account, and filter fictional
            provider profiles by profession.
          </p>
        </div>
        <div className="providers-page-emergency">
          <EmergencyCallBanner />
        </div>
        <ProviderDirectory />
      </main>
      <SiteFooter />
    </>
  );
}
