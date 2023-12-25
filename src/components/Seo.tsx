import * as React from 'react';
import Head from 'next/head';
import {withRouter, Router} from 'next/router';
import {siteConfig} from '../siteConfig';

export interface SeoProps {
  title: string;
  titleForTitleTag: undefined | string;
  description?: string;
  image?: string;
  // jsonld?: JsonLDType | Array<JsonLDType>;
  children?: React.ReactNode;
  isHomePage: boolean;
  searchOrder?: number;
}

const deployedTranslations = ['en', 'ja'];

function getDomain(languageCode: string): string {
  const subdomain = languageCode === 'en' ? '' : languageCode;
  return 'https://open-garden.github.io/garden/' + subdomain;
}

export const Seo = withRouter(
  ({
    title,
    titleForTitleTag,
    image = '/images/og-default.png',
    router,
    children,
    isHomePage,
    searchOrder,
  }: SeoProps & {router: Router}) => {
    const siteDomain = getDomain(siteConfig.languageCode);
    const canonicalUrl = `https://${siteDomain}${
      router.asPath.split(/[\?\#]/)[0]
    }`;
    // Allow setting a different title for Google results
    const pageTitle =
      (titleForTitleTag ?? title) + (isHomePage ? '' : ' – GARDEN');
    // 'GARDEN' + (isHomePage ? '' : ' – GARDEN');
    let description = isHomePage
      ? 'GARDEN ScenarioPlatform is a set of tools that support the process of scenario-based development for for autonomous driving research.'
      : 'GARDEN ScenarioPlatform is a set of tools that support the process of scenario-based development for for autonomous driving research.';
    return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title != null && <title key="title">{pageTitle}</title>}
        {isHomePage && (
          // Let Google figure out a good description for each page.
          <meta name="description" key="description" content={description} />
        )}
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          href={canonicalUrl.replace(siteDomain, getDomain('en'))}
          hrefLang="x-default"
        />
        {deployedTranslations.map((languageCode) => (
          <link
            key={'alt-' + languageCode}
            rel="alternate"
            hrefLang={languageCode}
            href={canonicalUrl.replace(siteDomain, getDomain(languageCode))}
          />
        ))}
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:url" key="og:url" content={canonicalUrl} />
        {title != null && (
          <meta property="og:title" content={pageTitle} key="og:title" />
        )}
        {description != null && (
          <meta
            property="og:description"
            key="og:description"
            content={description}
          />
        )}
        <meta
          property="og:image"
          key="og:image"
          content={`https://${siteDomain}${image}`}
        />
        {searchOrder != null && (
          <meta name="algolia-search-order" content={'' + searchOrder} />
        )}
        <link
          rel="preload"
          href="/fonts/Source-Code-Pro-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Display_W_Md.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Display_W_SBd.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Display_W_Bd.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Text_W_Md.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Text_W_Bd.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Text_W_Rg.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://react.dev/fonts/Optimistic_Text_W_It.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {children}
      </Head>
    );
  }
);
