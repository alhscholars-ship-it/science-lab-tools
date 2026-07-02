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
          <path
            d="M18 7h12M21 7v10L11.5 34.2A4.5 4.5 0 0 0 15.4 41h17.2a4.5 4.5 0 0 0 3.9-6.8L27 17V7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 31h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="21" cy="26" r="2" fill="currentColor" />
          <circle cx="27" cy="35" r="2" fill="currentColor" />
        </svg>
      </span>

      <span className="site-logo__text">
        <strong>{siteConfig.name}</strong>
        <small>Practical science made clear</small>
      </span>
    </Link>
  );
}
