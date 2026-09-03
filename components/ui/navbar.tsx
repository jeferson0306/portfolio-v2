"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n/provider";

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#trajectory", label: t.nav.trajectory },
    { href: "#work", label: t.nav.work },
    { href: "#stack", label: t.nav.stack },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-[var(--border)] bg-black/60 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          Jeferson Siqueira
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <LanguageSwitcher />
      </nav>
    </motion.header>
  );
}
