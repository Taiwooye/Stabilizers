"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import Brand from "./brand";
import {
  endDemoSession,
  getDemoSessionSnapshot,
  getServerDemoSessionSnapshot,
  subscribeToDemoSession,
} from "./demo-auth";

export default function SiteHeader() {
  const router = useRouter();
  const session = useSyncExternalStore(
    subscribeToDemoSession,
    getDemoSessionSnapshot,
    getServerDemoSessionSnapshot,
  );
  const [signOutError, setSignOutError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function signOut() {
    try {
      endDemoSession();
      closeMenu();
      router.push("/");
    } catch {
      setSignOutError("Could not sign out in this browser.");
    }
  }

  return (
    <header className="site-header">
      <Brand />
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        className="mobile-menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <nav
        aria-label="Main navigation"
        className={`main-nav${menuOpen ? " main-nav-open" : ""}`}
      >
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/providers" onClick={closeMenu}>Find support</Link>
        <Link href="/how-it-works" onClick={closeMenu}>How it works</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        {session.account ? (
          <>
            <Link className="nav-sign-in" href="/account" onClick={closeMenu}>
              My account
            </Link>
            <button className="nav-sign-out" onClick={signOut} type="button">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link className="nav-sign-in" href="/sign-in" onClick={closeMenu}>
              Sign in
            </Link>
            <Link className="nav-cta" href="/sign-up" onClick={closeMenu}>
              Create account <span aria-hidden="true">&#8599;</span>
            </Link>
          </>
        )}
      </nav>
      {signOutError && <span className="header-error" role="alert">{signOutError}</span>}
    </header>
  );
}
