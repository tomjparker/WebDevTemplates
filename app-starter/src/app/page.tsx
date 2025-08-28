// src/app/page.tsx
import Image from "next/image";

const Nav = () => (
  <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
      <a href="#home" className="text-sm font-semibold tracking-tight">MySite</a>
      <div className="hidden gap-6 sm:flex">
        <a href="#about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
        <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
        <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
      </div>
    </nav>
  </header>
);

export default function Home() {
  return (
    <div id="home" className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={200}
            height={44}
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A clean, scrollable starter
          </h1>
          <p className="max-w-2xl text-balance text-gray-600">
            Built with Next.js and Tailwind. Scroll the page or jump via the navbar
            — sections are well-spaced and easy on the eyes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#features"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              See features
            </a>
            <a
              href="#about"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-medium hover:bg-gray-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why this layout?</h2>
            <p className="mt-3 text-gray-600">
              It gives you a fast, scrolling page using just Tailwind defaults: spacing, type scale,
              and a sticky header. Add content and it just keeps flowing.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-2 rounded-full bg-gray-900" />
                Minimal CSS, maximum clarity.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-2 rounded-full bg-gray-900" />
                Smooth anchor scrolling built in.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-2 rounded-full bg-gray-900" />
                Easy to extend with components or your own classes later.
              </li>
            </ul>
          </div>

          <article className="prose prose-neutral max-w-none dark:prose-invert">
            <h3>Nicely formatted content</h3>
            <p>
              If you have <code>@tailwindcss/typography</code> installed, the <code>prose</code> class
              makes long-form content look great out of the box. Otherwise, this block simply inherits
              your base styles.
            </p>
            <p>
              You can keep sections light and scannable by using generous <code>py-16</code> /
              <code>py-24</code>, larger headings with <code>tracking-tight</code>, and balanced text.
            </p>
            <ol>
              <li>Good spacing</li>
              <li>Readable type</li>
              <li>Clear anchors</li>
            </ol>
          </article>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Features</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Sticky header", desc: "Always-visible nav with backdrop blur." },
            { title: "Smooth anchors", desc: "Jump between sections without jank." },
            { title: "Responsive grid", desc: "Cards flow nicely at any width." },
            { title: "Clean type", desc: "Tight headings, comfy body text." },
            { title: "Minimal code", desc: "Only Tailwind defaults — no custom CSS needed." },
            { title: "Extensible", desc: "Add your own classes or components later." },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Ready to ship?</h2>
              <p className="mt-2 text-gray-600">This template is production-friendly from the start.</p>
            </div>
            <a
              href="#home"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Back to top
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-8 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} You</span>
          <div className="flex gap-4">
            <a className="hover:underline" href="#about">About</a>
            <a className="hover:underline" href="#features">Features</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}