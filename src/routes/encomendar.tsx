import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { products, site } from "@/content/site";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/encomendar")({
  validateSearch: (s: Record<string, unknown>): { produto?: string | undefined } => ({ produto: typeof s["produto"] === "string" ? (s["produto"] as string) : undefined }),
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
const DM_URL = "https://ig.me/m/alentejovintage.rustico";

const copy = {
  intro: {
    pt: "As encomendas são feitas por mensagem privada no Instagram. É por lá que partilhamos o preço, as medidas e as opções de envio de cada peça.",
    en: "Orders are made by private message on Instagram. That's where we share each piece's price, size and shipping options.",
  },
  step1: { pt: "Escolha a peça", en: "Choose the piece" },
  step2: { pt: "Copie a mensagem", en: "Copy the message" },
  step3: { pt: "Envie-nos no Instagram", en: "Send it to us on Instagram" },
  copy: { pt: "Copiar mensagem", en: "Copy message" },
  copied: { pt: "Copiada ✓", en: "Copied ✓" },
  open: { pt: "Enviar mensagem no Instagram", en: "Message us on Instagram" },
  msg: {
    pt: (n: string) => `Olá! Tenho interesse na peça "${n}". Pode dizer-me o preço e as opções de envio? Obrigado(a)!`,
    en: (n: string) => `Hi! I'm interested in the piece "${n}". Could you tell me the price and shipping options? Thank you!`,
  },
};

function Order() {
  const { t, lang } = useI18n();
  const { produto } = Route.useSearch();
  const available = products.filter((p) => p.available);
  const [id, setId] = useState(produto ?? available[0]?.id ?? "");
  const [done, setDone] = useState(false);
  const p = products.find((x) => x.id === id);
  const message = copy.msg[lang](p?.name[lang] ?? "");

  const doCopy = async () => {
    try { await navigator.clipboard.writeText(message); setDone(true); setTimeout(() => setDone(false), 2000); } catch { /* ignore */ }
  };

  const Step = ({ n, label }: { n: number; label: string }) => (
    <p className="mb-3 flex items-center gap-3 font-display text-xl">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">{n}</span>
      {label}
    </p>
  );

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <PageTitle>{t("order")}</PageTitle>
      <p className="mb-10 text-center text-muted-foreground">{copy.intro[lang]}</p>
      <div className="space-y-8">
        <section>
          <Step n={1} label={copy.step1[lang]} />
          <select value={id} onChange={(e) => setId(e.target.value)} className={field} aria-label={t("product")}>
            {available.map((x) => <option key={x.id} value={x.id}>{x.name[lang]}</option>)}
          </select>
          {p && <img src={p.image} alt={p.name[lang]} className="mt-4 aspect-[4/3] w-full rounded-xl border object-cover" />}
        </section>
        <section>
          <Step n={2} label={copy.step2[lang]} />
          <p className="rounded-md border bg-secondary p-4 text-sm leading-relaxed">{message}</p>
          <button type="button" onClick={doCopy} className="mt-3 w-full rounded-full border py-3 text-sm uppercase tracking-widest hover:bg-secondary">
            {done ? copy.copied[lang] : copy.copy[lang]}
          </button>
        </section>
        <section>
          <Step n={3} label={copy.step3[lang]} />
          <a href={DM_URL} target="_blank" rel="noreferrer" onClick={doCopy} className="block w-full rounded-full bg-primary py-3 text-center text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90">
            {copy.open[lang]}
          </a>
        </section>
      </div>
    </div>
  );
}
