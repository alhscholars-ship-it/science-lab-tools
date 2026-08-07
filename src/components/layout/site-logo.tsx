import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteLogo() {
  return (
    <Link
      className="site-logo"
      href="/"
      aria-label={`${siteConfig.name} homepage`}
    >
      <span className="site-logo__mark" aria-hidden="true">
        <svg
          viewBox="0 0 48 48"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="4"
            fill="currentColor"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="17"
            ry="7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="17"
            ry="7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            transform="rotate(60 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="17"
            ry="7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            transform="rotate(120 24 24)"
          />
        </svg>
      </span>

      <span className="site-logo__text">
        <strong>{siteConfig.name}</strong>
        <small>Think · test · explain</small>
      </span>
    </Link>
  );
}
