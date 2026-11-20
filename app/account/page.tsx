import type { Metadata } from "next";
import AccountHome from "../components/account-home";

export const metadata: Metadata = {
  title: "My account — Stabilizers",
  description: "View your Stabilizers demo account.",
};

export default function AccountPage() {
  return <AccountHome />;
}
