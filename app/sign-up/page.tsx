import type { Metadata } from "next";
import AuthPage from "../components/auth-page";

export const metadata: Metadata = {
  title: "Create an account — Stabilizers",
  description: "Create a Stabilizers account.",
};

export default function SignUpPage() {
  return <AuthPage mode="sign-up" />;
}
