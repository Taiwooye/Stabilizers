"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createDemoAccount, signInDemoAccount } from "./demo-auth";

type AuthMode = "sign-in" | "sign-up" | "forgot-password";

const copy: Record<
  AuthMode,
  { eyebrow: string; title: string; description: string; button: string }
> = {
  "sign-in": {
    eyebrow: "WELCOME BACK",
    title: "Sign in to Stabilizers",
    description: "Pick up where you left off.",
    button: "Sign in",
  },
  "sign-up": {
    eyebrow: "A CALMER PLACE TO START",
    title: "Create your account",
    description: "Get ready before you need a steady next step.",
    button: "Create account",
  },
  "forgot-password": {
    eyebrow: "ACCOUNT SUPPORT",
    title: "Reset your password",
    description: "Enter the email address linked to your account.",
    button: "Send reset link",
  },
};

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const text = copy[mode];
  const router = useRouter();

  function getReturnPath() {
    const issue = new URLSearchParams(window.location.search).get("issue");
    const supportedIssues = ["emotional", "medical", "recovery", "family"];
    return issue && supportedIssues.includes(issue)
      ? `/?issue=${encodeURIComponent(issue)}#providers`
      : "/#providers";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    if (mode === "forgot-password") {
      setStatus("Password reset isn’t available in this local demo.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));

    try {
      if (mode === "sign-up") {
        if (formData.get("password") !== formData.get("confirm-password")) {
          setStatus("Those passwords don’t match. Please check and try again.");
          return;
        }

        createDemoAccount(String(formData.get("name")), email);
      } else if (!signInDemoAccount(email)) {
        setStatus("No demo account was found for this email. Create an account first.");
        return;
      }

      router.push(getReturnPath());
    } catch (error) {
      setStatus(
        error instanceof Error && error.message.includes("already exists")
          ? error.message
          : "The demo account couldn’t be saved in this browser. Check browser storage and try again.",
      );
    }
  }

  return (
    <main className="auth-main">
      <section aria-labelledby="auth-title" className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h1 id="auth-title">{text.title}</h1>
          <p>{text.description}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "sign-up" && (
            <div className="auth-field">
              <label htmlFor="full-name">Your name</label>
              <input
                autoComplete="name"
                id="full-name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          {mode !== "forgot-password" && (
            <>
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password">Password</label>
                  {mode === "sign-in" && (
                    <Link href="/forgot-password">Forgot password?</Link>
                  )}
                </div>
                <div className="password-input">
                  <input
                    autoComplete={
                      mode === "sign-in" ? "current-password" : "new-password"
                    }
                    id="password"
                    minLength={8}
                    name="password"
                    placeholder="At least 8 characters"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {mode === "sign-up" && (
                <div className="auth-field">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <input
                    autoComplete="new-password"
                    id="confirm-password"
                    minLength={8}
                    name="confirm-password"
                    placeholder="Enter your password again"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                </div>
              )}
            </>
          )}

          <p className="auth-preview-note">
            {mode === "forgot-password"
              ? "This local demo does not send password-reset emails."
              : mode === "sign-up"
                ? "Demo only: use a made-up name and email. They stay in this browser; your password is never saved."
                : "Use the email from your demo account. Any password works; it is never checked or saved."}
          </p>
          <button className="button button-dark auth-submit" type="submit">
            {text.button} <span aria-hidden="true">&#8594;</span>
          </button>
          <p aria-live="polite" className="auth-status" role="status">
            {status}
          </p>
        </form>

        <div className="auth-switch">
          {mode === "sign-in" ? (
            <>
              New to Stabilizers? <Link href="/sign-up">Create an account</Link>
            </>
          ) : mode === "sign-up" ? (
            <>
              Already have an account? <Link href="/sign-in">Sign in</Link>
            </>
          ) : (
            <>
              Remembered it? <Link href="/sign-in">Back to sign in</Link>
            </>
          )}
        </div>
      </section>

      <aside className="auth-aside">
        <span aria-hidden="true" className="auth-aside-mark">
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
        <p className="eyebrow">A STEADY NEXT STEP</p>
        <h2>When things feel urgent, keep it simple.</h2>
        <p>
          Stabilizers helps you find the words and make a clear call. Emergency
          professionals are always the ones to guide care.
        </p>
        <Link className="auth-emergency-link" href="/#emergency-call">
          Go to emergency call options <span aria-hidden="true">&#8594;</span>
        </Link>
        <p className="auth-emergency-note">
          If someone may be in immediate danger, call your local emergency
          number now.
        </p>
      </aside>
    </main>
  );
}
