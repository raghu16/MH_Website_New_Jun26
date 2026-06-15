import Link from "next/link";

// Navigates to the full-page AI consultant experience. Server-safe (plain Link).
export default function ConsultantButton({
  className = "btn-primary",
  children = "Talk to our AI consultant →",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href="/consultant" className={className}>
      {children}
    </Link>
  );
}
