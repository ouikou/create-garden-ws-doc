import {useState, useEffect, useRef} from 'react';
import cn from 'classnames';
import NextLink from 'next/link';

import ButtonLink from '../ButtonLink';
import BlogCard from 'components/MDX/BlogCard';
import {IconChevron} from 'components/Icon/IconChevron';
import {Logo} from 'components/Logo';
import CodeBlock from 'components/MDX/CodeBlock';
import {ExternalLink} from 'components/ExternalLink';
import sidebarBlog from '../../sidebarBlog.json';

function Section({children, background = null}) {
  return (
    <div
      className={cn(
        'mx-auto flex flex-col w-full',
        background === null && 'max-w-7xl',
        background === 'left-card' &&
          'bg-gradient-left dark:bg-gradient-left-dark border-t border-primary/10 dark:border-primary-dark/10 ',
        background === 'right-card' &&
          'bg-gradient-right dark:bg-gradient-right-dark border-t border-primary/5 dark:border-primary-dark/5'
      )}
      style={{
        contain: 'content',
      }}>
      <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

function Header({children}) {
  return (
    <h2 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl lg:max-w-xl">
      {children}
    </h2>
  );
}

function Para({children}) {
  return (
    <p className="max-w-3xl mx-auto text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
      {children}
    </p>
  );
}

function Center({children}) {
  return (
    <div className="px-5 lg:px-0 max-w-4xl lg:text-center text-white text-opacity-80 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

function FullBleed({children}) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col w-full">{children}</div>
  );
}

const blogSidebar = sidebarBlog.routes[1];
if (blogSidebar.path !== '/blog') {
  throw Error('Could not find the blog route in sidebarBlog.json');
}
const recentPosts = blogSidebar.routes.slice(0, 4).map((entry) => ({
  title: entry.titleForHomepage,
  icon: entry.icon,
  date: entry.date,
  url: entry.path,
}));

export function HomeContent() {
  return (
    <>
      <div className="ps-0">
        <div className="mx-5 mt-12 lg:mt-24 mb-20 lg:mb-32 flex flex-col justify-center">
          <Logo
            className={cn(
              'mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm me-0 flex origin-center transition-all ease-in-out'
            )}
          />
          <h1 className="text-5xl font-display lg:text-6xl self-center flex font-semibold leading-snug text-primary dark:text-primary-dark">
            GARDEN
          </h1>
          <p className="text-4xl font-display max-w-lg md:max-w-full py-1 text-center text-secondary dark:text-primary-dark leading-snug self-center">
            Sustainable Engineering of Autonomous System
          </p>
          <div className="mt-5 self-center flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
            <ButtonLink
              href={'/learn'}
              type="primary"
              size="lg"
              className="w-full sm:w-auto justify-center"
              label="Learn GARDEN">
              Learn GARDEN
            </ButtonLink>
            <ButtonLink
              href={'/reference/garden'}
              type="secondary"
              size="lg"
              className="w-full sm:w-auto justify-center"
              label="API Reference">
              API Reference
            </ButtonLink>
          </div>
        </div>

        <Section background="left-card">
          <Center>
            <Header>MARINA</Header>
            <Para>Cost Map Autonomous Rule base Intelligence Agent.</Para>
          </Center>
          <FullBleed>
            <Example1 />
          </FullBleed>
          <Center>
            <Para>About MARINA Overview...</Para>
            <div className="flex justify-start w-full lg:justify-center">
              <CTA color="gray" icon="code" href="#">
                Learn how to use MARINA
              </CTA>
            </div>
          </Center>
        </Section>

        <Section background="right-card">
          <Center>
            <Header>REEF</Header>
            <Para>
              Reinforcement learning with effective-Environment and
              effective-Eval Framework.
            </Para>
          </Center>
          <FullBleed>
            <Example1 />
          </FullBleed>
          <Center>
            <Para>About REEF Overview...</Para>
          </Center>
        </Section>

        <Section background="left-card">
          <Center>
            <Header>CoRAL</Header>
            <Para>Cost-Map Rule-based Adversarial Imitation Learning.</Para>
          </Center>
          <FullBleed>
            <Example1 />
          </FullBleed>
          <Center>
            <Para>About CoRAL Overview...</Para>
          </Center>
        </Section>

        <Section background="right-card">
          <Center>
            <Header>Hybrid AI</Header>
            <Para>......</Para>
          </Center>
          <FullBleed>
            <Example1 />
          </FullBleed>
          <Center>
            <Para>About Hybrid AI Overview...</Para>
          </Center>
        </Section>

        <Section background="right-card">
          <Center>
            <Header>MASTs</Header>
            <Para>......</Para>
          </Center>
          <FullBleed>
            <Example1 />
          </FullBleed>
          <Center>
            <Para>About MASTs Overview...</Para>
          </Center>
        </Section>

        <Section background="left-card">
          <div className="mx-auto flex flex-col w-full">
            <div className="mx-auto max-w-4xl lg:text-center items-center px-5 flex flex-col">
              <Header>GARDENの強み</Header>
              <Para>
                AAA <br className="hidden lg:inline" />
                BBB <br className="hidden lg:inline" />
                CCC
              </Para>
            </div>
          </div>
        </Section>

        <Section background="right-card">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
            <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
              <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
                <Header>Upgrade when the future is ready</Header>
                <Para>......</Para>
                <div className="order-last pt-5">
                  <div className="hidden lg:flex justify-start w-full">
                    <CTA color="gray" icon="news" href="/blog">
                      Read more GARDEN news
                    </CTA>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12">
                <p className="uppercase tracking-wide font-bold text-sm text-tertiary dark:text-tertiary-dark flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full">
                  <IconChevron />
                  Latest GARDEN News
                </p>
                <div className="flex-col sm:flex-row flex-wrap flex gap-5 text-start my-5">
                  <div className="flex-1 min-w-[40%] text-start">
                    <BlogCard {...recentPosts[0]} />
                  </div>
                  <div className="flex-1 min-w-[40%] text-start">
                    <BlogCard {...recentPosts[1]} />
                  </div>
                  <div className="flex-1 min-w-[40%] text-start">
                    <BlogCard {...recentPosts[2]} />
                  </div>
                  <div className="hidden sm:flex-1 sm:inline">
                    <BlogCard {...recentPosts[3]} />
                  </div>
                </div>
                <div className="flex lg:hidden justify-start w-full">
                  <CTA color="gray" icon="news" href="/blog">
                    Read more GARDEN news
                  </CTA>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

function CTA({children, icon, href}) {
  let Tag;
  let extraProps;
  if (href.startsWith('https://')) {
    Tag = ExternalLink;
  } else {
    Tag = NextLink;
    extraProps = {legacyBehavior: false};
  }
  return (
    <Tag
      {...extraProps}
      href={href}
      className="focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark group cursor-pointer w-auto justify-center inline-flex font-bold items-center mt-10 outline-none hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 leading-tight hover:bg-opacity-80 text-lg py-2.5 rounded-full px-4 sm:px-6 ease-in-out shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark text-primary dark:text-primary-dark">
      {icon === 'native' && (
        <svg
          className="me-2.5 text-primary dark:text-primary-dark"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 72 72"
          aria-hidden="true">
          <g clipPath="url(#clip0_8_10998)">
            <path
              d="M54.0001 15H18.0001C16.3432 15 15.0001 16.3431 15.0001 18V42H33V48H12.9567L9.10021 57L24.0006 57C24.0006 55.3431 25.3437 54 27.0006 54H33V57.473C33 59.3786 33.3699 61.2582 34.0652 63H9.10021C4.79287 63 1.88869 58.596 3.5852 54.6368L9.0001 42V18C9.0001 13.0294 13.0295 9 18.0001 9H54.0001C58.9707 9 63.0001 13.0294 63.0001 18V25.4411C62.0602 25.0753 61.0589 24.8052 60.0021 24.6458C59.0567 24.5032 58.0429 24.3681 57.0001 24.2587V18C57.0001 16.3431 55.6569 15 54.0001 15Z"
              fill="currentColor"
            />
            <path
              d="M48 42C48 40.3431 49.3431 39 51 39H54C55.6569 39 57 40.3431 57 42C57 43.6569 55.6569 45 54 45H51C49.3431 45 48 43.6569 48 42Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45.8929 30.5787C41.8093 31.1947 39 34.8257 39 38.9556V57.473C39 61.6028 41.8093 65.2339 45.8929 65.8499C48.0416 66.174 50.3981 66.4286 52.5 66.4286C54.6019 66.4286 56.9584 66.174 59.1071 65.8499C63.1907 65.2339 66 61.6028 66 57.473V38.9556C66 34.8258 63.1907 31.1947 59.1071 30.5787C56.9584 30.2545 54.6019 30 52.5 30C50.3981 30 48.0416 30.2545 45.8929 30.5787ZM60 57.473V38.9556C60 37.4615 59.0438 36.637 58.2121 36.5116C56.2014 36.2082 54.1763 36 52.5 36C50.8237 36 48.7986 36.2082 46.7879 36.5116C45.9562 36.637 45 37.4615 45 38.9556V57.473C45 58.9671 45.9562 59.7916 46.7879 59.917C48.7986 60.2203 50.8237 60.4286 52.5 60.4286C54.1763 60.4286 56.2014 60.2203 58.2121 59.917C59.0438 59.7916 60 58.9671 60 57.473Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_8_10998">
              <rect width="72" height="72" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {icon === 'framework' && (
        <svg
          className="me-2.5 text-primary dark:text-primary-dark"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 72 72"
          aria-hidden="true">
          <g clipPath="url(#clip0_10_21081)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44.9136 29.0343C46.8321 26.9072 48 24.09 48 21C48 14.3726 42.6274 9 36 9C29.3726 9 24 14.3726 24 21C24 24.0904 25.1682 26.9079 27.0871 29.0351L21.0026 39.3787C20.0429 39.1315 19.0368 39 18 39C11.3726 39 6 44.3726 6 51C6 57.6274 11.3726 63 18 63C23.5915 63 28.2898 59.1757 29.6219 54H42.3781C43.7102 59.1757 48.4085 63 54 63C60.6274 63 66 57.6274 66 51C66 44.3726 60.6274 39 54 39C52.9614 39 51.9537 39.1319 50.9926 39.38L44.9136 29.0343ZM42 21C42 24.3137 39.3137 27 36 27C32.6863 27 30 24.3137 30 21C30 17.6863 32.6863 15 36 15C39.3137 15 42 17.6863 42 21ZM39.9033 32.3509C38.6796 32.7716 37.3665 33 36 33C34.6338 33 33.321 32.7717 32.0975 32.3512L26.2523 42.288C27.8635 43.8146 29.0514 45.7834 29.6219 48H42.3781C42.9482 45.785 44.1348 43.8175 45.7441 42.2913L39.9033 32.3509ZM54 57C50.6863 57 48 54.3137 48 51C48 47.6863 50.6863 45 54 45C57.3137 45 60 47.6863 60 51C60 54.3137 57.3137 57 54 57ZM24 51C24 47.6863 21.3137 45 18 45C14.6863 45 12 47.6863 12 51C12 54.3137 14.6863 57 18 57C21.3137 57 24 54.3137 24 51Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_10_21081">
              <rect width="72" height="72" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {icon === 'code' && (
        <svg
          className="me-2.5 text-primary dark:text-primary-dark"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 72 72"
          aria-hidden="true">
          <g clipPath="url(#clip0_8_9064)">
            <path
              d="M44.7854 22.1142C45.4008 20.5759 44.6525 18.83 43.1142 18.2146C41.5758 17.5993 39.8299 18.3475 39.2146 19.8859L27.2146 49.8859C26.5992 51.4242 27.3475 53.1702 28.8858 53.7855C30.4242 54.4008 32.1701 53.6526 32.7854 52.1142L44.7854 22.1142Z"
              fill="currentColor"
            />
            <path
              d="M9.87868 38.1214C8.70711 36.9498 8.70711 35.0503 9.87868 33.8787L18.8787 24.8787C20.0503 23.7072 21.9497 23.7072 23.1213 24.8787C24.2929 26.0503 24.2929 27.9498 23.1213 29.1214L16.2426 36.0001L23.1213 42.8787C24.2929 44.0503 24.2929 45.9498 23.1213 47.1214C21.9497 48.293 20.0503 48.293 18.8787 47.1214L9.87868 38.1214Z"
              fill="currentColor"
            />
            <path
              d="M62.1213 33.8787L53.1213 24.8787C51.9497 23.7072 50.0503 23.7072 48.8787 24.8787C47.7071 26.0503 47.7071 27.9498 48.8787 29.1214L55.7574 36.0001L48.8787 42.8787C47.7071 44.0503 47.7071 45.9498 48.8787 47.1214C50.0503 48.293 51.9497 48.293 53.1213 47.1214L62.1213 38.1214C63.2929 36.9498 63.2929 35.0503 62.1213 33.8787Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_8_9064">
              <rect width="72" height="72" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {icon === 'news' && (
        <svg
          className="me-2.5 text-primary dark:text-primary-dark"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 72 72"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7101 56.3758C13.0724 56.7251 13.6324 57 14.3887 57H57.6113C58.3676 57 58.9276 56.7251 59.2899 56.3758C59.6438 56.0346 59.8987 55.5407 59.9086 54.864C59.9354 53.022 59.9591 50.7633 59.9756 48H12.0244C12.0409 50.7633 12.0645 53.022 12.0914 54.864C12.1013 55.5407 12.3562 56.0346 12.7101 56.3758ZM12.0024 42H59.9976C59.9992 41.0437 60 40.0444 60 39C60 29.5762 59.9327 22.5857 59.8589 17.7547C59.8359 16.2516 58.6168 15 56.9938 15L15.0062 15C13.3832 15 12.1641 16.2516 12.1411 17.7547C12.0673 22.5857 12 29.5762 12 39C12 40.0444 12.0008 41.0437 12.0024 42ZM65.8582 17.6631C65.7843 12.8227 61.8348 9 56.9938 9H15.0062C10.1652 9 6.21572 12.8227 6.1418 17.6631C6.06753 22.5266 6 29.5477 6 39C6 46.2639 6.03988 51.3741 6.09205 54.9515C6.15893 59.537 9.80278 63 14.3887 63H57.6113C62.1972 63 65.8411 59.537 65.9079 54.9515C65.9601 51.3741 66 46.2639 66 39C66 29.5477 65.9325 22.5266 65.8582 17.6631ZM39 21C37.3431 21 36 22.3431 36 24C36 25.6569 37.3431 27 39 27H51C52.6569 27 54 25.6569 54 24C54 22.3431 52.6569 21 51 21H39ZM36 33C36 31.3431 37.3431 30 39 30H51C52.6569 30 54 31.3431 54 33C54 34.6569 52.6569 36 51 36H39C37.3431 36 36 34.6569 36 33ZM24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z"
            fill="currentColor"
          />
        </svg>
      )}
      {children}
      <svg
        className="text-primary dark:text-primary-dark rtl:rotate-180"
        fill="none"
        width="24"
        height="24"
        viewBox="0 0 72 72"
        aria-hidden="true">
        <path
          className="transition-transform ease-in-out translate-x-[-8px] group-hover:translate-x-[8px]"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40.0001 19.0245C41.0912 17.7776 42.9864 17.6513 44.2334 18.7423L58.9758 33.768C59.6268 34.3377 60.0002 35.1607 60.0002 36.0257C60.0002 36.8908 59.6268 37.7138 58.9758 38.2835L44.2335 53.3078C42.9865 54.3988 41.0913 54.2725 40.0002 53.0256C38.9092 51.7786 39.0355 49.8835 40.2824 48.7924L52.4445 36.0257L40.2823 23.2578C39.0354 22.1667 38.9091 20.2714 40.0001 19.0245Z"
          fill="currentColor"
        />
        <path
          className="opacity-0 ease-in-out transition-opacity group-hover:opacity-100"
          d="M60 36.0273C60 37.6842 58.6569 39.0273 57 39.0273H15C13.3431 39.0273 12 37.6842 12 36.0273C12 34.3704 13.3431 33.0273 15 33.0273H57C58.6569 33.0273 60 34.3704 60 36.0273Z"
          fill="currentColor"
        />
      </svg>
    </Tag>
  );
}

function ExampleLayout({
  filename,
  left,
  right,
  activeArea,
  hoverTopOffset = 0,
}) {
  const contentRef = useRef(null);
  useNestedScrollLock(contentRef);

  const [overlayStyles, setOverlayStyles] = useState([]);
  useEffect(() => {
    if (activeArea) {
      const nodes = contentRef.current.querySelectorAll(
        '[data-hover="' + activeArea.name + '"]'
      );
      const nextOverlayStyles = Array.from(nodes)
        .map((node) => {
          const parentRect = contentRef.current.getBoundingClientRect();
          const nodeRect = node.getBoundingClientRect();
          let top = Math.round(nodeRect.top - parentRect.top) - 8;
          let bottom = Math.round(nodeRect.bottom - parentRect.top) + 8;
          let left = Math.round(nodeRect.left - parentRect.left) - 8;
          let right = Math.round(nodeRect.right - parentRect.left) + 8;
          top = Math.max(top, hoverTopOffset);
          bottom = Math.min(bottom, parentRect.height - 12);
          if (top >= bottom) {
            return null;
          }
          return {
            width: right - left + 'px',
            height: bottom - top + 'px',
            transform: `translate(${left}px, ${top}px)`,
          };
        })
        .filter((s) => s !== null);
      setOverlayStyles(nextOverlayStyles);
    }
  }, [activeArea, hoverTopOffset]);
  return (
    <div className="lg:ps-10 lg:pe-5 w-full">
      <div className="mt-12 mb-2 lg:my-16 max-w-7xl mx-auto flex flex-col w-full lg:rounded-2xl lg:bg-card lg:dark:bg-card-dark">
        <div className="flex-col gap-0 lg:gap-5 lg:rounded-2xl lg:bg-gray-10 lg:dark:bg-gray-70 shadow-inner-border dark:shadow-inner-border-dark lg:flex-row flex grow w-full mx-auto items-center bg-cover bg-center lg:bg-right ltr:lg:bg-[length:60%_100%] bg-no-repeat bg-meta-gradient dark:bg-meta-gradient-dark">
          <div className="lg:-m-5 h-full shadow-nav dark:shadow-nav-dark lg:rounded-2xl bg-wash dark:bg-gray-95 w-full flex grow flex-col">
            <div className="w-full bg-card dark:bg-wash-dark lg:rounded-t-2xl border-b border-black/5 dark:border-white/5">
              <h3 className="text-sm my-1 mx-5 text-tertiary dark:text-tertiary-dark select-none text-start">
                {filename}
              </h3>
            </div>
            {left}
          </div>
          <div
            ref={contentRef}
            className="relative mt-0 lg:-my-20 w-full p-2.5 xs:p-5 lg:p-10 flex grow justify-center">
            {right}
            <div
              className={cn(
                'absolute z-10 inset-0 pointer-events-none transition-opacity transform-gpu',
                activeArea ? 'opacity-100' : 'opacity-0'
              )}>
              {overlayStyles.map((styles, i) => (
                <div
                  key={i}
                  className="top-0 start-0 bg-blue-30/5 border-2 border-link dark:border-link-dark absolute rounded-lg"
                  style={styles}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useCodeHover(areas) {
  const [hoverLine, setHoverLine] = useState(null);
  const area = areas.get(hoverLine);
  let meta;
  if (area) {
    const highlightLines = area.lines ?? [hoverLine];
    meta = '```js {' + highlightLines.map((l) => l + 1).join(',') + '}';
  }
  return [area, meta, setHoverLine];
}

const example1Areas = new Map([
  [2, {name: 'Video'}],
  [3, {name: 'Thumbnail'}],
  [4, {name: 'a'}],
  [5, {name: 'h3'}],
  [6, {name: 'p'}],
  [7, {name: 'a'}],
  [8, {name: 'LikeButton'}],
  [9, {name: 'Video'}],
]);

function Example1() {
  const [area, meta, onLineHover] = useCodeHover(example1Areas);
  return (
    <ExampleLayout
      filename="Video.js"
      activeArea={area}
      left={
        <CodeBlock
          onLineHover={onLineHover}
          isFromPackageImport={false}
          noShadow={true}
          noMargin={true}>
          <div meta={meta}>{`function Video({ video }) {
  return (
    <div>
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}
          `}</div>
        </CodeBlock>
      }
      right={
        <ExamplePanel height="113px">
          <Video
            video={{
              id: 'ex1-0',
              title: 'My video',
              description: 'Video description',
              image: 'blue',
              url: null,
            }}
          />
        </ExamplePanel>
      }
    />
  );
}

function useNestedScrollLock(ref) {
  useEffect(() => {
    let node = ref.current;
    let isLocked = false;
    let lastScroll = performance.now();

    function handleScroll() {
      if (!isLocked) {
        isLocked = true;
        node.style.pointerEvents = 'none';
      }
      lastScroll = performance.now();
    }

    function updateLock() {
      if (isLocked && performance.now() - lastScroll > 150) {
        isLocked = false;
        node.style.pointerEvents = '';
      }
    }

    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(updateLock, 60);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [ref]);
}

function ExamplePanel({
  children,
  noPadding,
  noShadow,
  height,
  contentMarginTop,
}) {
  return (
    <div
      className={cn(
        'max-w-3xl rounded-2xl mx-auto text-secondary leading-normal bg-white overflow-hidden w-full overflow-y-auto',
        noShadow ? 'shadow-none' : 'shadow-nav dark:shadow-nav-dark'
      )}
      style={{height}}>
      <div
        className={noPadding ? 'p-0' : 'p-4'}
        style={{contentVisibility: 'auto', marginTop: contentMarginTop}}>
        {children}
      </div>
    </div>
  );
}

function Video({video}) {
  return (
    <div className="flex flex-row items-center gap-3" data-hover="Video">
      <Thumbnail video={video} />
      <a
        href={video.url}
        target="_blank"
        rel="noreferrer"
        className="outline-link dark:outline-link outline-offset-4 group flex flex-col flex-1 gap-0.5"
        data-hover="a">
        <h3
          className={cn(
            'text-base leading-tight text-primary font-bold',
            video.url && 'group-hover:underline'
          )}
          data-hover="h3">
          {video.title}
        </h3>
        <p className="text-tertiary text-sm leading-snug" data-hover="p">
          {video.description}
        </p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}

function Thumbnail({video}) {
  const {image} = video;
  return (
    <a
      data-hover="Thumbnail"
      href={video.url}
      target="_blank"
      rel="noreferrer"
      aria-hidden="true"
      tabIndex={-1}
      className={cn(
        'outline-link dark:outline-link outline-offset-2 aspect-video w-32 xs:w-36 select-none flex-col shadow-inner-border rounded-lg flex items-center overflow-hidden justify-center align-middle text-white/50 bg-cover bg-white bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]',
        image === 'blue' && 'from-yellow-50 via-blue-50 to-purple-60',
        image === 'red' && 'from-yellow-50 via-red-50 to-purple-60',
        image === 'green' && 'from-yellow-50 via-green-50 to-purple-60',
        image === 'purple' && 'from-yellow-50 via-purple-50 to-purple-60',
        typeof image === 'object' && 'from-gray-80 via-gray-95 to-gray-70',
        video.url && 'hover:opacity-95 transition-opacity'
      )}
      style={{
        backgroundImage:
          typeof image === 'string' && image.startsWith('/')
            ? 'url(' + image + ')'
            : null,
      }}>
      {typeof image !== 'string' ? (
        <>
          <div className="transition-opacity mt-2.5 -space-x-2 flex flex-row w-full justify-center">
            {image.speakers.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                className="h-8 w-8 border-2 shadow-md border-gray-70 object-cover rounded-full"
                src={src}
                alt=""
              />
            ))}
          </div>
          <div className="mt-1">
            <span className="inline-flex text-xs font-normal items-center text-primary-dark py-1 whitespace-nowrap outline-link px-1.5 rounded-lg">
              <Logo className="text-xs me-1 w-4 h-4 text-link-dark" />
              React Conf
            </span>
          </div>
        </>
      ) : image.startsWith('/') ? null : (
        <ThumbnailPlaceholder />
      )}
    </a>
  );
}

function ThumbnailPlaceholder() {
  return (
    <svg
      className="drop-shadow-xl"
      width="36"
      height="36"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 69C54.2254 69 69 54.2254 69 36C69 17.7746 54.2254 3 36 3C17.7746 3 3 17.7746 3 36C3 54.2254 17.7746 69 36 69ZM52.1716 38.6337L28.4366 51.5801C26.4374 52.6705 24 51.2235 24 48.9464V23.0536C24 20.7764 26.4374 19.3295 28.4366 20.4199L52.1716 33.3663C54.2562 34.5034 54.2562 37.4966 52.1716 38.6337Z"
        fill="currentColor"
      />
    </svg>
  );
}

// A hack since we don't actually have a backend.
// Unlike local state, this survives videos being filtered.
const likedVideos = new Set();

function LikeButton({video}) {
  const [isLiked, setIsLiked] = useState(() => likedVideos.has(video.id));
  const [animate, setAnimate] = useState(false);
  return (
    <button
      data-hover="LikeButton"
      className={cn(
        'outline-none focus:bg-red-50/5 focus:text-red-50 relative flex items-center justify-center w-10 h-10 cursor-pointer rounded-full hover:bg-card active:scale-95 active:bg-red-50/5 active:text-red-50',
        isLiked ? 'text-red-50' : 'text-tertiary'
      )}
      aria-label={isLiked ? 'Unsave' : 'Save'}
      onClick={() => {
        const nextIsLiked = !isLiked;
        if (nextIsLiked) {
          likedVideos.add(video.id);
        } else {
          likedVideos.delete(video.id);
        }
        setAnimate(true);
        setIsLiked(nextIsLiked);
      }}>
      <svg
        className="absolute overflow-visible"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          className={cn(
            'text-red-50/50 origin-center transition-all ease-in-out',
            isLiked && animate && 'animate-[circle_.3s_forwards]'
          )}
          cx="12"
          cy="12"
          r="11.5"
          fill="transparent"
          strokeWidth="0"
          stroke="currentColor"
        />
      </svg>
      {isLiked ? (
        <svg
          className={cn(
            'w-6 h-6 origin-center transition-all ease-in-out',
            isLiked && animate && 'animate-[scale_.35s_ease-in-out_forwards]'
          )}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 23a.496.496 0 0 1-.26-.074C7.023 19.973 0 13.743 0 8.68c0-4.12 2.322-6.677 6.058-6.677 2.572 0 5.108 2.387 5.134 2.41l.808.771.808-.771C12.834 4.387 15.367 2 17.935 2 21.678 2 24 4.558 24 8.677c0 5.06-7.022 11.293-11.74 14.246a.496.496 0 0 1-.26.074V23z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m12 5.184-.808-.771-.004-.004C11.065 4.299 8.522 2.003 6 2.003c-3.736 0-6 2.558-6 6.677 0 4.47 5.471 9.848 10 13.079.602.43 1.187.82 1.74 1.167A.497.497 0 0 0 12 23v-.003c.09 0 .182-.026.26-.074C16.977 19.97 24 13.737 24 8.677 24 4.557 21.743 2 18 2c-2.569 0-5.166 2.387-5.192 2.413L12 5.184zm-.002 15.525c2.071-1.388 4.477-3.342 6.427-5.47C20.72 12.733 22 10.401 22 8.677c0-1.708-.466-2.855-1.087-3.55C20.316 4.459 19.392 4 18 4c-.726 0-1.63.364-2.5.9-.67.412-1.148.82-1.266.92-.03.025-.037.031-.019.014l-.013.013L12 7.949 9.832 5.88a10.08 10.08 0 0 0-1.33-.977C7.633 4.367 6.728 4.003 6 4.003c-1.388 0-2.312.459-2.91 1.128C2.466 5.826 2 6.974 2 8.68c0 1.726 1.28 4.058 3.575 6.563 1.948 2.127 4.352 4.078 6.423 5.466z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
