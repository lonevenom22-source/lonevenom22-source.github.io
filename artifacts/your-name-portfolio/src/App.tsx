import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Circle,
  Code2,
  ExternalLink,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  PenLine,
  Sparkles,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

// Edit these values to personalize the portfolio in one place.
const siteName = 'Sherif';
const emailAddress = 'your.email@example.com';

const projects = [
  {
    number: '01',
    title: 'Sparkle Home Cleaning website',
    description: 'A welcoming, easy-to-scan site concept for a local cleaning team — with services, FAQs, and a clear path to enquire.',
    type: 'Website concept',
    accent: 'aqua',
  },
  {
    number: '02',
    title: 'Sparkle Quote Calculator',
    description: 'A small quoting tool concept that helps visitors answer a few simple questions before getting in touch.',
    type: 'Small tool concept',
    accent: 'coral',
  },
];

const services = [
  {
    icon: Layers3,
    number: '01',
    title: 'Business websites',
    description: 'A clear, considered home on the web that makes it easy for the right people to understand what you do.',
  },
  {
    icon: Code2,
    number: '02',
    title: 'Quote calculators',
    description: 'Small, focused tools that turn a few useful questions into a more helpful first conversation.',
  },
  {
    icon: MessageCircle,
    number: '03',
    title: 'Booking and contact forms',
    description: 'Simple ways for people to share what they need, without making them work too hard to reach you.',
  },
];

function Reveal({
  children,
  className = '',
  delay = '',
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  return <div className={`reveal ${delay} ${className}`}>{children}</div>;
}

function DemoPlaceholder({ accent, title }: { accent: string; title: string }) {
  const isCoral = accent === 'coral';
  return (
    <div
      className={`project-visual relative min-h-[250px] overflow-hidden p-5 sm:min-h-[280px] ${
        isCoral ? 'bg-[#f9eee9]' : ''
      }`}
      role="img"
      aria-label={`Image placeholder for ${title}`}
      data-testid={`img-placeholder-${accent}`}
    >
      <div className="absolute right-4 top-4 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#516673]">
        image placeholder
      </div>
      <div className="project-window absolute left-[12%] right-[12%] top-[23%] overflow-hidden rounded-[13px] border border-[#bed0cf] bg-[#fbfaf4]">
        <div className="flex h-8 items-center gap-1.5 border-b border-[#d8e1dd] bg-[#eef3ee] px-3">
          <Circle className="h-2.5 w-2.5 fill-[#f07f65] stroke-[#f07f65]" />
          <Circle className="h-2.5 w-2.5 fill-[#edc967] stroke-[#edc967]" />
          <Circle className="h-2.5 w-2.5 fill-[#69cfc1] stroke-[#69cfc1]" />
          <div className="ml-auto h-2 w-16 rounded-full bg-[#d0dcda]" />
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-3 p-4 sm:p-5">
          <div>
            <div className={`mb-3 h-2 w-16 rounded-full ${isCoral ? 'bg-[#f07f65]' : 'bg-[#65e2d0]'}`} />
            <div className="h-4 w-[88%] rounded bg-[#17334a]" />
            <div className="mt-1.5 h-4 w-[65%] rounded bg-[#17334a]" />
            <div className="mt-5 h-2 w-full rounded bg-[#d7e1df]" />
            <div className="mt-1.5 h-2 w-[80%] rounded bg-[#d7e1df]" />
            <div className={`mt-5 h-7 w-20 rounded-full ${isCoral ? 'bg-[#f07f65]' : 'bg-[#65e2d0]'}`} />
          </div>
          <div className="flex items-end justify-end">
            <div className={`h-20 w-20 rounded-full border-[10px] ${isCoral ? 'border-[#f07f65]/25 border-t-[#f07f65]' : 'border-[#65e2d0]/25 border-t-[#65e2d0]'}`} />
          </div>
        </div>
      </div>
      <div className={`absolute bottom-5 left-5 font-display text-4xl font-bold tracking-[-0.08em] ${isCoral ? 'text-[#d56753]' : 'text-[#198f87]'}`}>
        0{accent === 'coral' ? '2' : '1'}
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );
    nodes.forEach((node) => observer.observe(node));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f7f7f1] text-[#071a2b]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'nav-shadow bg-[#f7f7f1]/95 backdrop-blur-md' : 'bg-[#f7f7f1]/80 backdrop-blur-sm'}`}>
        <div className="container-wide flex h-[74px] items-center justify-between">
          <a href="#top" onClick={closeMenu} className="group flex items-center gap-3" data-testid="link-logo">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#071a2b] text-[#65e2d0] transition-transform duration-300 group-hover:rotate-[-8deg]">
              <PenLine className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="font-display text-[15px] font-bold tracking-[-0.04em]">{siteName}</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a className="link-underline text-sm font-semibold text-[#49606b] transition-colors hover:text-[#071a2b]" href="#about" data-testid="link-about">About</a>
            <a className="link-underline text-sm font-semibold text-[#49606b] transition-colors hover:text-[#071a2b]" href="#projects" data-testid="link-projects">Projects</a>
            <a className="link-underline text-sm font-semibold text-[#49606b] transition-colors hover:text-[#071a2b]" href="#services" data-testid="link-services">Services</a>
            <a className="group inline-flex items-center gap-2 rounded-full bg-[#071a2b] px-4 py-2.5 text-sm font-bold text-[#f7f7f1] transition-all hover:-translate-y-0.5 hover:bg-[#17334a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65e2d0] focus-visible:ring-offset-2" href="#contact" data-testid="button-header-contact">
              Contact <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          <button className="grid h-10 w-10 place-items-center rounded-full border border-[#c8d8d5] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#d8e2df] bg-[#f7f7f1] px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
            {['About', 'Projects', 'Services'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu} className="block border-b border-[#d8e2df] py-4 font-display text-xl font-semibold" data-testid={`link-mobile-${item.toLowerCase()}`}>{item}</a>
            ))}
            <a href="#contact" onClick={closeMenu} className="mt-4 flex items-center justify-between rounded-full bg-[#071a2b] px-5 py-3.5 font-semibold text-[#f7f7f1]" data-testid="button-mobile-contact">Contact <ArrowUpRight className="h-4 w-4" /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="grain relative bg-[#f7f7f1] pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="container-wide relative z-10">
            <div className="grid items-end gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
              <div>
                <Reveal>
                  <div className="mb-7 flex items-center gap-3 font-mono-ui text-[10px] font-medium uppercase tracking-[0.2em] text-[#198f87]">
                    <span className="h-2 w-2 rounded-full bg-[#65e2d0] shadow-[0_0_0_5px_rgba(101,226,208,.18)]" />
                    Web design & small tools
                  </div>
                </Reveal>
                <Reveal delay="reveal-delay-1">
                  <h1 className="max-w-[850px] font-display text-[clamp(2.65rem,9vw,6.85rem)] font-bold leading-[0.94] tracking-[-0.075em] text-[#071a2b]">
                    I build simple websites and tools that help local businesses get more enquiries.
                  </h1>
                </Reveal>
                <Reveal delay="reveal-delay-2">
                  <p className="mt-8 max-w-[530px] text-[16px] leading-7 text-[#49606b] sm:text-lg">
                    I turn straightforward ideas into clear, useful digital experiences — without unnecessary fuss or jargon.
                  </p>
                </Reveal>
                <Reveal delay="reveal-delay-3">
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#071a2b] px-6 py-4 font-bold text-[#f7f7f1] transition-all duration-300 hover:-translate-y-1 hover:bg-[#17334a] hover:shadow-[0_12px_24px_rgba(7,26,43,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65e2d0] focus-visible:ring-offset-2" data-testid="button-hero-cta">
                      Let’s work together <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                    <a href="#projects" className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 font-bold text-[#071a2b] transition-colors hover:text-[#198f87]" data-testid="link-hero-projects">
                      See selected work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal className="relative" delay="reveal-delay-2">
                <div className="relative mx-auto max-w-[490px] lg:mr-0">
                  <div className="absolute -left-8 top-12 hidden h-24 w-24 rounded-full border border-[#65e2d0] sm:block" />
                  <div className="absolute -right-3 -top-5 h-20 w-20 rounded-full bg-[#f07f65] sm:-right-8 sm:-top-8" />
                  <div className="relative rounded-[2rem] bg-[#071a2b] p-5 text-[#f7f7f1] shadow-[0_25px_70px_rgba(7,26,43,.2)] sm:p-7">
                    <div className="flex items-center justify-between border-b border-[#f7f7f1]/15 pb-5">
                      <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#65e2d0]">A clear path online</span>
                      <span className="font-mono-ui text-[10px] text-[#8ba2ab]">01 — 03</span>
                    </div>
                    <div className="py-10 sm:py-14">
                      <div className="mb-7 flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-[#65e2d0]" />
                        <span className="h-px w-14 bg-[#65e2d0]" />
                        <span className="font-mono-ui text-xs text-[#9ab0b5]">idea → useful tool</span>
                      </div>
                      <p className="max-w-[340px] font-display text-3xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-4xl">
                        Make it clear. Make it useful. Make it yours.
                      </p>
                    </div>
                    <div className="flex items-end justify-between border-t border-[#f7f7f1]/15 pt-5">
                      <div>
                        <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-[#8ba2ab]">Current focus</div>
                        <div className="mt-1 font-semibold">Websites + small tools</div>
                      </div>
                      <Sparkles className="h-6 w-6 text-[#65e2d0]" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="absolute -bottom-7 -left-4 rounded-2xl bg-[#65e2d0] px-4 py-3 text-[#071a2b] shadow-lg sm:-left-10">
                    <span className="block font-mono-ui text-[9px] uppercase tracking-[0.16em]">built for</span>
                    <span className="font-display text-sm font-bold">real conversations</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="border-y border-[#d8e2df] bg-[#eef4ee]">
          <div className="container-wide flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 font-mono-ui text-[10px] uppercase tracking-[0.15em] text-[#49606b]">
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#198f87]" /> Approachable by design</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#198f87]" /> Built to be useful</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#198f87]" /> Ready to learn</span>
          </div>
        </div>

        <section id="about" className="bg-[#f7f7f1] py-24 sm:py-32">
          <div className="container-wide">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
              <Reveal>
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#198f87]">01 / About</div>
                <div className="mt-8 h-px w-24 bg-[#65e2d0]" />
              </Reveal>
              <Reveal delay="reveal-delay-1">
                <h2 className="max-w-[850px] font-display text-[clamp(2rem,5vw,4.7rem)] font-bold leading-[0.98] tracking-[-0.065em]">
                  Good digital work starts with listening to the <span className="text-[#198f87]">actual question.</span>
                </h2>
                <div className="mt-9 grid gap-8 text-[#49606b] sm:grid-cols-2 sm:gap-12">
                  <p className="text-base leading-7">I’m {siteName}, a beginner web designer and app builder who likes making things feel a little less complicated.</p>
                  <p className="text-base leading-7">I’m building this practice around straightforward ideas from local businesses — then shaping them into websites and small tools people can understand and use.</p>
                </div>
              </Reveal>
            </div>
            <Reveal className="mt-20" delay="reveal-delay-2">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#dcefeb] p-7 sm:p-10">
                <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[28px] border-[#65e2d0]/40" />
                <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#198f87]">A useful north star</div>
                    <p className="mt-4 max-w-[620px] font-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#071a2b] sm:text-3xl">If someone can understand what to do next, the design is doing its job.</p>
                  </div>
                  <ArrowDownRight className="h-10 w-10 shrink-0 text-[#198f87]" strokeWidth={1.4} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="bg-[#071a2b] py-24 text-[#f7f7f1] sm:py-32">
          <div className="container-wide">
            <Reveal>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#65e2d0]">02 / Projects</div>
                  <h2 className="mt-5 max-w-[600px] font-display text-[clamp(2.3rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.07em]">A couple of things I’m shaping.</h2>
                </div>
                <p className="max-w-[300px] text-sm leading-6 text-[#a7babd]">Early work, made with care. These are starting points — not pretend case studies.</p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-7 lg:grid-cols-2">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index === 0 ? 'reveal-delay-1' : 'reveal-delay-2'}>
                  <article className="project-card group overflow-hidden rounded-[1.5rem] border border-[#f7f7f1]/15 bg-[#102b40] transition-colors duration-300 hover:border-[#65e2d0]/60" data-testid={`card-project-${index + 1}`}>
                    <DemoPlaceholder accent={project.accent} title={project.title} />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="mb-4 font-mono-ui text-[10px] uppercase tracking-[0.18em] text-[#65e2d0]">{project.number} / {project.type}</div>
                          <h3 className="max-w-[410px] font-display text-2xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-3xl">{project.title}</h3>
                        </div>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-[#65e2d0] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                      <p className="mt-5 max-w-[470px] text-sm leading-6 text-[#adc0c1]">{project.description}</p>
                      <a href={`#replace-${project.number}-demo-link`} className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#65e2d0] px-4 py-2.5 text-sm font-bold text-[#65e2d0] transition-all hover:bg-[#65e2d0] hover:text-[#071a2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65e2d0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102b40]" data-testid={`link-demo-${index + 1}`} aria-label={`View live demo of ${project.title} — replace placeholder link`}>
                        View live demo <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <div className="mt-3 font-mono-ui text-[9px] uppercase tracking-[0.12em] text-[#7f9a9e]">Link placeholder — edit href in source</div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#f7f7f1] py-24 sm:py-32">
          <div className="container-wide">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
              <Reveal>
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#198f87]">03 / Services</div>
                <h2 className="mt-5 max-w-[400px] font-display text-[clamp(2.4rem,5vw,4.7rem)] font-bold leading-[0.95] tracking-[-0.07em]">Small scope. Thoughtful detail.</h2>
                <p className="mt-7 max-w-[330px] text-sm leading-6 text-[#49606b]">A few practical ways we can make your next digital idea easier to use.</p>
              </Reveal>
              <div className="divide-y divide-[#d8e2df] border-y border-[#d8e2df]">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Reveal key={service.title} delay={index === 0 ? 'reveal-delay-1' : index === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}>
                      <div className="group grid gap-5 py-7 sm:grid-cols-[60px_1fr_auto] sm:items-start sm:gap-8 sm:py-9" data-testid={`service-${index + 1}`}>
                        <div className="flex items-center justify-between sm:block">
                          <span className="font-mono-ui text-[10px] text-[#198f87]">{service.number}</span>
                          <Icon className="h-6 w-6 text-[#198f87] transition-transform duration-300 group-hover:rotate-[-10deg] group-hover:scale-110 sm:mt-7" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{service.title}</h3>
                          <p className="mt-3 max-w-[490px] text-sm leading-6 text-[#49606b]">{service.description}</p>
                        </div>
                        <ArrowRight className="hidden h-5 w-5 text-[#198f87] transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#eef4ee] py-20 sm:py-28">
          <div className="container-wide">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[.6fr_1.4fr] md:items-end">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#198f87]">How I think about it</div>
                <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                  <div><div className="font-display text-5xl font-bold tracking-[-0.08em] text-[#071a2b]">01</div><p className="mt-3 text-sm leading-6 text-[#49606b]">Start with the person who needs the answer.</p></div>
                  <div><div className="font-display text-5xl font-bold tracking-[-0.08em] text-[#071a2b]">02</div><p className="mt-3 text-sm leading-6 text-[#49606b]">Keep the important path easy to spot.</p></div>
                  <div><div className="font-display text-5xl font-bold tracking-[-0.08em] text-[#071a2b]">03</div><p className="mt-3 text-sm leading-6 text-[#49606b]">Leave room to learn and improve.</p></div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="grain relative bg-[#071a2b] py-24 text-[#f7f7f1] sm:py-32">
          <div className="container-wide relative z-10">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[1fr_.72fr] lg:items-end lg:gap-24">
                <div>
                  <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#65e2d0]">04 / Contact</div>
                  <h2 className="mt-6 max-w-[740px] font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.08em]">Have a simple idea?</h2>
                  <p className="mt-8 max-w-[510px] text-base leading-7 text-[#adc0c1] sm:text-lg">Tell me what you’re trying to make easier. We can start with a conversation and see where it goes.</p>
                </div>
                <div className="border-t border-[#f7f7f1]/20 pt-6 lg:border-t-0 lg:border-l lg:pl-10">
                  <div className="font-mono-ui text-[10px] uppercase tracking-[0.17em] text-[#8ba2ab]">Editable email</div>
                  <a href={`mailto:${emailAddress}`} className="mt-3 inline-flex items-center gap-2 break-all font-display text-xl font-semibold text-[#65e2d0] transition-colors hover:text-[#f7f7f1]" data-testid="link-email">{emailAddress} <ArrowUpRight className="h-4 w-4 shrink-0" /></a>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <a href={`mailto:${emailAddress}`} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#65e2d0] px-5 py-3.5 font-bold text-[#071a2b] transition-all hover:-translate-y-1 hover:bg-[#8cecdf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65e2d0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a2b]" data-testid="button-email-contact">Let’s work together <Mail className="h-4 w-4 transition-transform group-hover:rotate-[-8deg]" /></a>
                    <a href="#replace-whatsapp-link" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#f7f7f1]/30 px-5 py-3.5 font-bold text-[#f7f7f1] transition-colors hover:border-[#65e2d0] hover:text-[#65e2d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65e2d0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071a2b]" data-testid="button-whatsapp-placeholder">Message on WhatsApp <MessageCircle className="h-4 w-4" /></a>
                  </div>
                  <p className="mt-3 font-mono-ui text-[9px] uppercase tracking-[0.12em] text-[#718b91]">WhatsApp link placeholder — edit href in source</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#071a2b] px-5 pb-8 text-[#f7f7f1]">
        <div className="container-wide border-t border-[#f7f7f1]/15 pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <a href="#top" className="font-display text-lg font-bold tracking-[-0.05em]" data-testid="link-footer-logo">{siteName}</a>
            <div className="flex items-center gap-5 text-sm text-[#a7babd]">
              <a href="#about" className="transition-colors hover:text-[#65e2d0]" data-testid="link-footer-about">About</a>
              <a href="#projects" className="transition-colors hover:text-[#65e2d0]" data-testid="link-footer-projects">Projects</a>
              <a href="#contact" className="transition-colors hover:text-[#65e2d0]" data-testid="link-footer-contact">Contact</a>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#718b91]">
              <span>© {new Date().getFullYear()} {siteName}</span>
              <a href="#replace-linkedin" aria-label="LinkedIn link placeholder" className="transition-colors hover:text-[#65e2d0]" data-testid="link-linkedin-placeholder"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;