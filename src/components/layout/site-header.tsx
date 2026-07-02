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
        </nav>
      </Container>
    </header>
  );
}
