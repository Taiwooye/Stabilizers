export default function CallModeIcons() {
  return (
    <div aria-label="Audio and video call icons, preview only" className="call-mode-icons">
      <span className="call-mode">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path
            d="M7.2 3.5h2.3l1.2 4.1-1.6 1.7a14 14 0 0 0 5.6 5.6l1.7-1.6 4.1 1.2v2.3c0 1.1-.9 2-2 2C10 18.8 5.2 14 5.2 5.5c0-1.1.9-2 2-2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
        Audio
      </span>
      <span className="call-mode">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="6"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="m15 10 5-3v10l-5-3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
        Video
      </span>
    </div>
  );
}
