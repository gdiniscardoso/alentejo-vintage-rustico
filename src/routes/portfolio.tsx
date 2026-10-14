import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { products, categories, type Category } from "@/content/site";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Alentejo Vintage & Rústico" },
      { name: "description", content: "Peças feitas à mão com preços: garrafas, decoração e vintage." },
      { property: "og:title", content: "Portfólio — Alentejo Vintage & Rústico" },
      { property: "og:description", content: "Handmade bottles, decor and vintage pieces with prices." },
    ],
  }),
  component: Portfolio,
});

const chip = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm ${on ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`;

function Portfolio() {
  const { t, lang } = useI18n();
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
  const [avail, setAvail] = useState(false);
  const list = useMemo(() => {
    let l = products.filter((p) => (cat === "all" || p.category === cat) && (!avail || p.available));
    if (sort !== "none") l = [...l].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
    return l;
  }, [cat, sort, avail]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <PageTitle>{t("portfolio")}</PageTitle>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        <button className={chip(cat === "all")} onClick={() => setCat("all")}>{t("all")}</button>
        {(Object.keys(categories) as Category[]).map((c) => (
          <button key={c} className={chip(cat === c)} onClick={() => setCat(c)}>{categories[c][lang]}</button>
        ))}
        <span className="mx-2 hidden h-6 w-px bg-border sm:block" />
        <button className={chip(avail)} onClick={() => setAvail(!avail)}>{t("onlyAvail")}</button>
        <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-full border bg-card px-4 py-1.5 text-sm">
          <option value="none">{t("sort")}</option>
          <option value="asc">{t("priceAsc")}</option>
          <option value="desc">{t("priceDesc")}</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl border bg-card">
            <div className="relative">
              <img src={p.image} alt={p.name[lang]} loading="lazy" width={800} height={1008} className="aspect-[4/5] w-full object-cover" />
              {!p.available && <span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1 text-xs text-background">{t("sold")}</span>}
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{categories[p.category][lang]}</p>
                <h3 className="truncate text-2xl">{p.name[lang]}</h3>
              </div>
              <p className="shrink-0 font-display text-2xl text-primary">{p.price} €</p>
            </div>
            {p.available && (
              <Link to="/encomendar" search={{ produto: p.id }} className="block border-t py-3 text-center text-sm uppercase tracking-widest hover:bg-secondary">{t("order")}</Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
