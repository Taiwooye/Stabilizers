import type { Metadata } from "next";
import AuthPage from "../components/auth-page";

export const metadata: Metadata = {
  title: "Sign in — Stabilizers",
  description: "Sign in to your Stabilizers account.",
};

export default function SignInPage() {
  return <AuthPage mode="sign-in" />;
}
