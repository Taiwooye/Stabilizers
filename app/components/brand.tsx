import Link from "next/link";

export default function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      aria-label="Stabilizers home"
      className={`brand${footer ? " footer-brand" : ""}`}
      href="/"
    >
      <span aria-hidden="true" className="brand-mark">
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
      <span>
        <strong>stabilizers</strong>
        <small>HELP ON THE MOVE</small>
      </span>
    </Link>
  );
}
