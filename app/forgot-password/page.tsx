import type { Metadata } from "next";
import AuthPage from "../components/auth-page";

export const metadata: Metadata = {
  title: "Reset password — Stabilizers",
  description: "Request a password reset for your Stabilizers account.",
};

export default function ForgotPasswordPage() {
  return <AuthPage mode="forgot-password" />;
}
