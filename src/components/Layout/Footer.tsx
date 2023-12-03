import * as React from 'react';
import NextLink from 'next/link';
import cn from 'classnames';
import {ExternalLink} from 'components/ExternalLink';
import {IconTwitter} from 'components/Icon/IconTwitter';
import {IconGitHub} from 'components/Icon/IconGitHub';

export function Footer() {
  const socialLinkClasses = 'hover:text-primary dark:text-primary-dark';
  return (
    <footer className={cn('text-secondary dark:text-secondary-dark')}>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-8 max-w-7xl mx-auto">
        <div className="col-span-2 md:col-span-1 justify-items-start mt-3.5">
          <ExternalLink
            href="https://open-garden.github.io/garden/ja/"
            aria-label="GARDEN Open Source">
            GARDEN
          </ExternalLink>

          <div
            className="text-xs text-left rtl:text-right mt-2 pe-0.5"
            dir="ltr">
            &copy;{new Date().getFullYear()}
          </div>
        </div>
        <div className="flex flex-col">
          <FooterLink href="/learn" isHeader={true}>
            Learn GARDEN
          </FooterLink>
          <FooterLink href="/learn/">Quick Start</FooterLink>
          <FooterLink href="/learn/installation">Installation</FooterLink>
          <FooterLink href="/learn/marina">MARINA</FooterLink>
          <FooterLink href="/learn/reef">REEF</FooterLink>
          <FooterLink href="/learn/coral">CoRAL</FooterLink>
          <FooterLink href="/learn/hybridai">Hybrid AI</FooterLink>
          <FooterLink href="/learn/masts">MASTs</FooterLink>
        </div>
        <div className="flex flex-col">
          <FooterLink href="/reference/garden" isHeader={true}>
            API Reference
          </FooterLink>
          <FooterLink href="/reference/garden">GARDEN APIs</FooterLink>
        </div>
        <div className="md:col-start-2 xl:col-start-4 flex flex-col">
          <FooterLink href="/community" isHeader={true}>
            Community
          </FooterLink>
          <FooterLink href="https://open-garden.github.io/garden/ja/">
            Code of Conduct
          </FooterLink>
          <FooterLink href="/community/team">Meet the Team</FooterLink>
          <FooterLink href="/community/docs-contributors">
            Docs Contributors
          </FooterLink>
          <FooterLink href="/community/acknowledgements">
            Acknowledgements
          </FooterLink>
        </div>
        <div className="flex flex-col">
          <FooterLink isHeader={true}>More</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="https://open-garden.github.io/garden/ja/">
            Privacy
          </FooterLink>
          <FooterLink href="https://open-garden.github.io/garden/ja/">
            Terms
          </FooterLink>
          <div className="flex flex-row mt-8 gap-x-2">
            <ExternalLink
              aria-label="GARDEN on Twitter"
              href="https://open-garden.github.io/garden/ja/"
              className={socialLinkClasses}>
              <IconTwitter />
            </ExternalLink>
            <ExternalLink
              aria-label="GARDEN on Github"
              href="https://github.com/open-garden/garden"
              className={socialLinkClasses}>
              <IconGitHub />
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  isHeader = false,
}: {
  href?: string;
  children: React.ReactNode;
  isHeader?: boolean;
}) {
  const classes = cn('border-b inline-block border-transparent', {
    'text-sm text-primary dark:text-primary-dark': !isHeader,
    'text-md text-secondary dark:text-secondary-dark my-2 font-bold': isHeader,
    'hover:border-gray-10': href,
  });

  if (!href) {
    return <div className={classes}>{children}</div>;
  }

  if (href.startsWith('https://')) {
    return (
      <div>
        <ExternalLink href={href} className={classes}>
          {children}
        </ExternalLink>
      </div>
    );
  }

  return (
    <div>
      <NextLink href={href} className={classes}>
        {children}
      </NextLink>
    </div>
  );
}
