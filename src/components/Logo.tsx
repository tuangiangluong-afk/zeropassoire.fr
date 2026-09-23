export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 24 L24 8 L42 24"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 26 V40 H38 V26"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 34 V20 M18 25 L24 19 L30 25"
        stroke="#f59e0b"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
