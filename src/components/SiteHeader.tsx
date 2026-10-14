import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/content/site";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/portfolio", label: t("portfolio") },
    { to: "/feiras", label: t("fairs") },
    { to: "/sobre", label: t("about") },
    { to: "/encomendar", label: t("order") },
  ] as const;
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="min-w-0 truncate font-display text-xl font-semibold sm:text-2xl">
          Alentejo Vintage <span className="text-primary">&amp;</span> Rústico
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm uppercase tracking-widest hover:text-primary" activeProps={{ className: "text-primary" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex rounded-full border p-0.5 text-xs">
            {(["pt", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`rounded-full px-2.5 py-1 uppercase ${lang === l ? "bg-primary text-primary-foreground" : ""}`}>{l}</button>
            ))}
          </div>
          <button className="md:hidden px-2 text-2xl" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="uppercase tracking-widest">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm sm:flex-row">
        <p className="font-display text-lg">Alentejo Vintage &amp; Rústico</p>
        <p className="text-muted-foreground">
          {t("findUs")}{" "}
          <a href={site.instagram} target="_blank" rel="noreferrer" className="text-primary underline">Instagram</a> ·{" "}
          <a href={site.vinted} target="_blank" rel="noreferrer" className="text-primary underline">Vinted</a>
        </p>
      </div>
    </footer>
  );
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-10 text-center text-5xl font-medium sm:text-6xl">{children}</h1>;
}
