import { CalendarDays } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";
import { PageTitle } from "@/components/SiteHeader";

const copy = {
  title: { pt: "Mais novidades em breve", en: "More news soon" },
  text: {
    pt: "Estamos a preparar as próximas feiras. Siga-nos no Instagram para saber onde nos vai encontrar.",
    en: "We're preparing our next fairs. Follow us on Instagram to find out where to meet us.",
  },
};

// Placeholder while no fairs are scheduled; the dated list lives in git history (before this change).
export default function Fairs() {
  useSeo({ title: "Próximas Feiras — Alentejo Vintage & Rústico", description: "Onde nos encontrar: as próximas feiras de artesanato.", ogTitle: "Próximas Feiras — Alentejo Vintage & Rústico", ogDescription: "Upcoming craft fairs where you can find us." });
  const { t, lang } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <PageTitle>{t("nextFairs")}</PageTitle>
      <div className="flex flex-col items-center rounded-xl border bg-card px-6 py-16 text-center">
        <CalendarDays className="h-12 w-12 text-olive" strokeWidth={1.25} />
        <p className="mt-6 font-display text-3xl">{copy.title[lang]}</p>
        <p className="mt-3 max-w-md text-muted-foreground">{copy.text[lang]}</p>
      </div>
    </div>
  );
}
