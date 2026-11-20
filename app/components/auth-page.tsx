import AuthForm from "./auth-form";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

type AuthMode = "sign-in" | "sign-up" | "forgot-password";

export default function AuthPage({ mode }: { mode: AuthMode }) {
  return (
    <>
      <SiteHeader />
      <AuthForm mode={mode} />
      <SiteFooter />
    </>
  );
}
