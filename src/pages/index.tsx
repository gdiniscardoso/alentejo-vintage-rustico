import { Link } from "react-router";
import { ArrowRight, Instagram, Leaf, MapPin, type LucideIcon } from "lucide-react";
import { useSeo } from "@/lib/seo";
import hero from "@/assets/hero-home.jpg";
import { useI18n } from "@/lib/i18n";
import { products } from "@/content/site";

const highlights: { icon: LucideIcon; title: { pt: string; en: string }; text: { pt: string; en: string } }[] = [
  { icon: Leaf, title: { pt: "Peças autênticas", en: "Authentic pieces" }, text: { pt: "Com história e tradição", en: "With history and tradition" } },
  { icon: MapPin, title: { pt: "Nas feiras", en: "At the fairs" }, text: { pt: "Encontre-nos no Alentejo", en: "Find us in the Alentejo" } },
  { icon: Instagram, title: { pt: "Encomendas por Instagram", en: "Orders via Instagram" }, text: { pt: "Apoio personalizado", en: "Personal support" } },
];

export default function Index() {
  useSeo({ title: "Alentejo Vintage & Rústico — Peças feitas à mão", description: "Garrafas decoradas e peças rústicas feitas à mão no Alentejo.", ogTitle: "Alentejo Vintage & Rústico", ogDescription: "Handcrafted bottles and rustic pieces from the Alentejo." });
  const { t, lang } = useI18n();
  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <img src={hero} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-foreground/50 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-12 pt-32 text-white">
          <p className="font-display text-lg sm:text-xl">{t("welcome")}</p>
          <h1 className="mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">Alentejo Vintage<br />&amp; Rústico</h1>
          <p className="mt-6 max-w-md whitespace-pre-line text-sm leading-relaxed opacity-95 sm:text-base">{t("tagline")}</p>
          <Link to="/portfolio" className="mt-8 flex w-fit items-center gap-3 rounded-sm bg-primary px-7 py-3.5 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90">{t("seeWork")} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative bg-secondary text-foreground">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title.pt} className="flex items-center gap-4 px-6 py-4 sm:justify-center">
                <Icon className="h-7 w-7 shrink-0 text-olive" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium">{title[lang]}</p>
                  <p className="text-xs text-muted-foreground">{text[lang]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((p) => (
            <Link to="/portfolio" key={p.id} className="group">
              <img src={p.image} alt={p.name[lang]} loading="lazy" width={800} height={1008} className="aspect-[4/5] w-full rounded-lg object-cover transition group-hover:opacity-90" />
              <p className="mt-2 font-display text-lg">{p.name[lang]}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
