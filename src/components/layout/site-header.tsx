import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <SiteLogo />

        <nav className="site-navigation" aria-label="Main navigation">
          {siteConfig.categories.map((category) => (
            <Link key={category.href} href={category.href}>
              {category.name}
            </Link>
          ))}
          <Link href="/search">Search</Link>
        </nav>

        <details className="mobile-navigation">
          <summary>
            <span>Menu</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </summary>

          <nav aria-label="Mobile navigation">
            {siteConfig.categories.map((category) => (
              <Link key={category.href} href={category.href}>
                {category.name}
              </Link>
            ))}
            <Link href="/search">Search</Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
