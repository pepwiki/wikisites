import { createSignal, Show } from "solid-js";

const NAV_LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/review", label: "Review" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/community", label: "Community" },
  { href: "/glossary", label: "Glossary" },
];

interface MobileNavProps {
  currentPath: string;
}

export default function MobileNav(props: MobileNavProps) {
  const [open, setOpen] = createSignal(false);

  return (
    <nav class="lg:hidden" aria-label="Mobile navigation">
      <button
        type="button"
        class="p-2 text-slate-600 dark:text-slate-400 hover:text-[#0D9488] focus:outline-none focus:ring-2 focus:ring-[#0D9488] rounded"
        onClick={() => setOpen(!open())}
        aria-label={open() ? "Close menu" : "Open menu"}
        aria-expanded={open()}
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          {open() ? (
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      <Show when={open()}>
        <div class="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-50">
          <ul class="max-w-7xl mx-auto px-6 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li>
                <a
                  href={link.href}
                  class={`block py-2 text-sm font-medium transition-colors ${
                    props.currentPath.startsWith(link.href)
                      ? "text-[#0D9488]"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#0D9488]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Show>
    </nav>
  );
}
