import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { products, site } from "@/content/site";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/encomendar")({
  validateSearch: (s: Record<string, unknown>): { produto?: string } => ({ produto: typeof s["produto"] === "string" ? (s["produto"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "Encomendar — Alentejo Vintage & Rústico" },
      { name: "description", content: "Encomende as suas peças feitas à mão." },
      { property: "og:title", content: "Encomendar — Alentejo Vintage & Rústico" },
      { property: "og:description", content: "Order your handmade pieces." },
    ],
  }),
  component: Order,
});

const field = "w-full rounded-md border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

function Order() {
  const { t, lang } = useI18n();
  const { produto } = Route.useSearch();
  const [f, setF] = useState({ name: "", email: "", product: produto ?? products.find((p) => p.available)?.id ?? "", qty: 1, message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = products.find((x) => x.id === f.product);
    const body = `${t("name")}: ${f.name}\n${t("email")}: ${f.email}\n${t("product")}: ${p?.name[lang]} (${p?.price} €)\n${t("qty")}: ${f.qty}\n\n${f.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${t("order")}: ${p?.name[lang]}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <PageTitle>{t("order")}</PageTitle>
      <p className="mb-8 text-center text-muted-foreground">{t("orderIntro")}</p>
      <form onSubmit={submit} className="space-y-4">
        <input required maxLength={100} placeholder={t("name")} value={f.name} onChange={set("name")} className={field} />
        <input required type="email" maxLength={255} placeholder={t("email")} value={f.email} onChange={set("email")} className={field} />
        <div className="grid grid-cols-[1fr_7rem] gap-4">
          <select value={f.product} onChange={set("product")} className={field} aria-label={t("product")}>
            {products.filter((p) => p.available).map((p) => (
              <option key={p.id} value={p.id}>{p.name[lang]} — {p.price} €</option>
            ))}
          </select>
          <input type="number" min={1} max={50} value={f.qty} onChange={set("qty")} className={field} aria-label={t("qty")} />
        </div>
        <textarea rows={4} maxLength={1000} placeholder={t("message")} value={f.message} onChange={set("message")} className={field} />
        <button className="w-full rounded-full bg-primary py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90">{t("send")}</button>
      </form>
    </div>
  );
}
