import { Link } from "react-router";
import { useSeo } from "@/lib/seo";
import hero from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { products, fairs } from "@/content/site";

export default function Index() {
  useSeo({ title: "Alentejo Vintage & Rústico — Peças feitas à mão", description: "Garrafas decoradas e peças rústicas feitas à mão no Alentejo.", ogTitle: "Alentejo Vintage & Rústico", ogDescription: "Handcrafted bottles and rustic pieces from the Alentejo." });
  const { t, lang } = useI18n();
  const next = fairs[0];
  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden">
        <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/20" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-end px-5 pb-12 pt-32 text-background sm:pb-16">
          <h1 className="text-4xl font-medium leading-none sm:text-6xl lg:text-7xl">Alentejo Vintage<br />&amp; Rústico</h1>
          <p className="mt-6 font-display text-xl sm:text-2xl">{t("welcome")}</p>
          <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed opacity-95 sm:text-lg">{t("tagline")}</p>
          <Link to="/portfolio" className="mt-8 w-fit rounded-full bg-primary px-7 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90">{t("seeWork")}</Link>
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
      {next && (
        <section className="mx-auto max-w-6xl px-5">
          <Link to="/feiras" className="block rounded-xl bg-olive p-8 text-primary-foreground">
            <p className="text-xs uppercase tracking-widest opacity-80">{t("nextFairs")}</p>
            <p className="mt-2 font-display text-3xl">{next.name}</p>
            <p className="opacity-90">{new Date(next.date).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", { day: "numeric", month: "long" })} · {next.place}</p>
          </Link>
        </section>
      )}
    </>
  );
}
