"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

/**
 * Site header — DESIGN.md §4.8. Solid bar + hairline (no blur/shadow), numbered mono nav.
 * Menu open-state is keyed to the pathname, so it closes on navigation without an effect.
 */
export function Header() {
  const pathname = usePathname();
  const siteConfig = useSiteConfig();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const isMenuOpen = openAt === pathname;

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Navigating from the menu should not steal focus back to the toggle; Esc / the toggle should.
  const returnFocusRef = useRef(true);
  const closeMenuAfterNavigation = useCallback(() => {
    returnFocusRef.current = false;
    setOpenAt(null);
  }, []);

  // Esc closes; body scroll locked while open; closes if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMenuOpen) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setOpenAt(null);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = previousOverflow;
      if (returnFocusRef.current) toggle?.focus();
      returnFocusRef.current = true;
    };
  }, [isMenuOpen]);

  // Focus trap: Tab cycles through the toggle and the open menu (the sheet is a disclosure, not aria-modal,
  // so the toggle stays reachable and can close it).
  const onHeaderKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !isMenuOpen || !menuRef.current) return;
      const focusable = [
        toggleRef.current,
        ...menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [isMenuOpen],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header onKeyDown={onHeaderKeyDown} className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="page-shell flex h-14 items-stretch justify-between md:h-16">
        <Link
          href="/"
          className="t-label flex items-center gap-3 font-bold"
        >
          {/* visible text stays inside the accessible name (WCAG 2.5.3) */}
          <span>
            DG<span className="sr-only">, Dhruv Gupta, home</span>
          </span>
          <span className="hidden whitespace-nowrap font-normal text-muted-foreground lg:inline">
            Portfolio / 2026
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-stretch md:flex">
          <ul className="flex items-stretch">
            {NAV_ITEMS.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "t-label group relative flex items-center gap-2 px-3 transition-colors duration-(--dur-ui) ease-(--ease-out) lg:px-4",
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="text-xs" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-(--dur-ui) ease-(--ease-out) lg:inset-x-4",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-foreground",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="t-label h-full border-l border-border px-4 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setOpenAt(isMenuOpen ? null : pathname)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu — full-screen sheet below the bar */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!isMenuOpen}
        className="fixed inset-x-0 bottom-0 top-14 flex flex-col overflow-y-auto border-t border-border bg-background md:hidden"
      >
        <nav aria-label="Mobile" className="page-shell flex-1 py-6">
          <ul className="border-t border-border">
            {NAV_ITEMS.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={closeMenuAfterNavigation}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-4",
                      active ? "text-primary" : "text-foreground",
                    )}
                  >
                    <span className="t-label w-6 text-muted-foreground" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="t-h2">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="page-shell t-label flex flex-wrap gap-x-6 gap-y-2 border-t border-border py-5 text-muted-foreground">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            LinkedIn <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={siteConfig.links.email} className="hover:text-foreground">
            Email <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
