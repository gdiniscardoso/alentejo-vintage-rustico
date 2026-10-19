import { useSeo } from "@/lib/seo";
import hero from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { site } from "@/content/site";
import { PageTitle } from "@/components/SiteHeader";

export default function About() {
  useSeo({ title: "Sobre — Alentejo Vintage & Rústico", description: "A visão e missão por trás das nossas peças feitas à mão.", ogTitle: "Sobre — Alentejo Vintage & Rústico", ogDescription: "The vision and mission behind our handmade pieces." });
  const { t, lang } = useI18n();
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <PageTitle>{t("about")}</PageTitle>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <img src={hero} alt="" loading="lazy" width={1600} height={1008} className="aspect-[4/5] w-full rounded-xl object-cover" />
        <div className="space-y-10">
          {[["vision", site.vision], ["mission", site.mission]].map(([k, v]) => (
            <div key={k as string}>
              <p className="text-xs uppercase tracking-[0.3em] text-olive">{t(k as "vision")}</p>
              <blockquote className="mt-3 font-display text-3xl italic leading-snug">“{(v as typeof site.vision)[lang]}”</blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
