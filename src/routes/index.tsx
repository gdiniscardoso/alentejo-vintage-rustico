import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { products, fairs } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alentejo Vintage & Rústico — Peças feitas à mão" },
      { name: "description", content: "Garrafas decoradas e peças rústicas feitas à mão no Alentejo." },
      { property: "og:title", content: "Alentejo Vintage & Rústico" },
      { property: "og:description", content: "Handcrafted bottles and rustic pieces from the Alentejo." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const next = fairs[0];
  return (
    <>
      <section className="relative h-[80vh] min-h-[480px] overflow-hidden">
        <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 text-background">
          <h1 className="text-5xl font-medium leading-none sm:text-7xl">Alentejo Vintage<br />&amp; Rústico</h1>
          <p className="mt-4 max-w-md text-lg">{t("tagline")}</p>
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
