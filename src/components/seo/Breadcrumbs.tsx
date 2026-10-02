import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name?: string;
  label?: string;
  url?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const normalized = items.map((it) => ({
    name: it.name || it.label || "",
    href: it.href || it.url || "/",
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://zeropassoire.fr",
      },
      ...normalized.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.href.startsWith("http")
          ? item.href
          : `https://zeropassoire.fr${item.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className={`flex items-center text-xs text-stone-500 overflow-x-auto whitespace-nowrap py-3 ${className}`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Accueil</span>
        </Link>

        {normalized.map((item, idx) => {
          const isLast = idx === normalized.length - 1;
          return (
            <div key={idx} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-stone-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-stone-900 truncate max-w-[220px] sm:max-w-xs">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-emerald-700 transition-colors truncate max-w-[160px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
