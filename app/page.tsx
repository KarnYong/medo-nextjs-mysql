import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

const features = [
  {
    title: "Capture in seconds",
    body: "Dump every task the moment it hits you. Zero friction, zero forms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
      </svg>
    ),
  },
  {
    title: "Focus on what matters",
    body: "Today's tasks surface themselves. Everything else stays out of sight.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M3 12h2m14 0h2M5.6 18.4L7 17m10-10l1.4-1.4" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    title: "Feel the streak",
    body: "Watch your completion streak grow. Progress you can actually see.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18l5-6 4 3 7-9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 6h4v4" />
      </svg>
    ),
  },
];

const stats = [
  { value: "250k+", label: "tasks crushed daily" },
  { value: "4.8★", label: "average rating" },
  { value: "92%", label: "report better focus" },
];

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col flex-1">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 font-display text-xl text-primary">
          <Image
            src="/melivecode-logo.png"
            alt="Me Do logo"
            width={43}
            height={32}
            className="h-8 w-auto"
            priority
          />
          Me Do
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-foreground/70 sm:inline">
              ▸ {user.name}
            </span>
            <Link
              href="/todos"
              className="cursor-pointer rounded-lg bg-primary px-5 py-2 font-medium text-on-primary transition-colors duration-200 hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              My tasks
            </Link>
          </div>
        ) : (
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="cursor-pointer rounded-lg px-5 py-2 font-medium text-foreground/70 transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="cursor-pointer rounded-lg border-2 border-primary px-5 py-2 font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started
            </Link>
          </nav>
        )}
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 text-center md:pt-24">
          <p className="mx-auto mb-5 w-fit rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-primary">
            Stop planning. Start finishing.
          </p>
          <h1 className="font-display mx-auto max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
            Own your day.
            <br />
            <span className="text-primary">Crush your list.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            Me Do is the todo app that turns chaos into forward motion.
            Capture tasks in seconds, focus on today, and build a streak
            you&apos;ll never want to break.
          </p>
          <div id="get-started" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {user ? (
              <Link
                href="/todos"
                className="flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl bg-accent px-8 text-lg font-semibold text-on-primary transition-colors duration-200 hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Go to my tasks
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl bg-accent px-8 text-lg font-semibold text-on-primary transition-colors duration-200 hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Start free
                </Link>
                <Link
                  href="/login"
                  className="flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl border-2 border-primary px-8 text-lg font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign in
                </Link>
              </>
            )}
            {!user && (
              <a
                href="#features"
                className="flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl border-2 border-primary px-8 text-lg font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
              See how it works
            </a>
            )}
          </div>

          {/* App preview card */}
          <div className="mx-auto mt-16 max-w-md rounded-2xl border-2 border-border bg-card p-6 text-left">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg text-foreground">Today</h2>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-primary">
                3 / 5 done
              </span>
            </div>
            <ul className="space-y-3">
              {[
                { label: "Ship the landing page", done: true },
                { label: "Review pull requests", done: true },
                { label: "30-min run", done: true },
                { label: "Plan tomorrow", done: false },
                { label: "Call mom", done: false },
              ].map((t) => (
                <li key={t.label} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                      t.done
                        ? "border-primary bg-primary text-on-primary"
                        : "border-border"
                    }`}
                  >
                    {t.done && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
                      </svg>
                    )}
                  </span>
                  <span className={t.done ? "text-foreground/40 line-through" : "text-foreground"}>
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y-2 border-border bg-card py-12 text-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 text-center sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl text-primary">{s.value}</p>
                <p className="mt-2 text-sm font-medium tracking-wide text-foreground/60 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="font-display text-center text-3xl text-foreground md:text-4xl">
            Built for momentum, not busywork
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border-2 border-border bg-card p-8 transition-colors duration-200 hover:border-primary"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-on-primary">
                  {f.icon}
                </div>
                <h3 className="font-display mt-5 text-xl text-foreground">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/70">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="rounded-3xl border-2 border-primary bg-card px-6 py-16 text-center">
            <h2 className="font-display text-3xl text-primary md:text-4xl">
              Your first win is one click away
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-foreground/70">
              Free forever for solo use. No credit card, no setup.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {user ? (
                <Link
                  href="/todos"
                  className="inline-flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-lg font-semibold text-on-primary transition-colors duration-200 hover:bg-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Go to my tasks
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl bg-primary px-8 text-lg font-semibold text-on-primary transition-colors duration-200 hover:bg-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-12 min-w-44 cursor-pointer items-center justify-center rounded-xl border-2 border-primary px-8 text-lg font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-border py-8 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Me Do. Built for people who finish.
      </footer>
    </div>
  );
}
