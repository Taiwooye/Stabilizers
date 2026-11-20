import Link from "next/link";
import Brand from "./brand";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Main navigation" className="main-nav">
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#safety">Safety &amp; privacy</Link>
        <Link className="nav-sign-in" href="/sign-in">
          Sign in
        </Link>
        <Link className="nav-cta" href="/sign-up">
          Create account <span aria-hidden="true">&#8599;</span>
        </Link>
      </nav>
    </header>
  );
}
