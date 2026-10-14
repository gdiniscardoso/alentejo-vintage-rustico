import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fairs } from "@/content/site";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/feiras")({
  head: () => ({
    meta: [
      { title: "Próximas Feiras — Alentejo Vintage & Rústico" },
      { name: "description", content: "Onde nos encontrar: as próximas feiras de artesanato." },
      { property: "og:title", content: "Próximas Feiras — Alentejo Vintage & Rústico" },
      { property: "og:description", content: "Upcoming craft fairs where you can find us." },
    ],
  }),
  component: Fairs,
});

function Fairs() {
  const { t, lang } = useI18n();
  const locale = lang === "pt" ? "pt-PT" : "en-GB";
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = fairs.filter((f) => f.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <PageTitle>{t("nextFairs")}</PageTitle>
      {upcoming.length === 0 && <p className="text-center text-muted-foreground">{t("noFairs")}</p>}
      <ul className="divide-y border-y">
        {upcoming.map((f) => {
          const d = new Date(f.date);
          return (
            <li key={f.date + f.name} className="flex items-center gap-6 py-6">
              <div className="w-20 shrink-0 text-center">
                <p className="font-display text-4xl text-primary">{d.getDate()}</p>
                <p className="text-xs uppercase tracking-widest">{d.toLocaleDateString(locale, { month: "short" })}</p>
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl">{f.name}</h3>
                <p className="text-muted-foreground">{f.place}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
