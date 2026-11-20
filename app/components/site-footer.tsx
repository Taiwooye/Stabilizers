import Link from "next/link";
import Brand from "./brand";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand footer />
      <p>Not a substitute for emergency services or professional medical advice.</p>
      <Link href="/#safety">Safety &amp; privacy</Link>
    </footer>
  );
}
