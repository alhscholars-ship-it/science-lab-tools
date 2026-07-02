import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <SiteLogo />
            <p>
              Reviewed calculators, laboratory templates, and practical
              science resources designed for clear learning.
            </p>
          </div>

          <div>
            <h2 className="site-footer__heading">Resources</h2>
            <nav className="site-footer__links" aria-label="Footer resources">
              {siteConfig.categories.map((category) => (
                <Link key={category.href} href={category.href}>
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="site-footer__heading">Our standards</h2>
            <ul className="site-footer__standards">
              <li>Formula-checked calculations</li>
              <li>Student-friendly explanations</li>
              <li>Printable classroom resources</li>
              <li>Transparent review dates</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p>Educational resources are not a substitute for laboratory safety supervision.</p>
        </div>
      </Container>
    </footer>
  );
}
