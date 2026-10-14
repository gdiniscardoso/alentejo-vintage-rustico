import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/content/site";

const dict = {
  home: { pt: "Início", en: "Home" },
  portfolio: { pt: "Portfólio", en: "Portfolio" },
  fairs: { pt: "Feiras", en: "Fairs" },
  about: { pt: "Sobre", en: "About" },
  order: { pt: "Encomendar", en: "Order" },
  tagline: { pt: "Garrafas e peças feitas à mão, com alma alentejana.", en: "Handcrafted bottles and pieces with an Alentejo soul." },
  seeWork: { pt: "Ver portfólio", en: "See portfolio" },
  all: { pt: "Todos", en: "All" },
  sold: { pt: "Esgotado", en: "Sold out" },
  sort: { pt: "Ordenar", en: "Sort" },
  priceAsc: { pt: "Preço ↑", en: "Price ↑" },
  priceDesc: { pt: "Preço ↓", en: "Price ↓" },
  onlyAvail: { pt: "Só disponíveis", en: "Available only" },
  nextFairs: { pt: "Próximas feiras", en: "Upcoming fairs" },
  noFairs: { pt: "Sem feiras agendadas.", en: "No fairs scheduled." },
  vision: { pt: "Visão", en: "Vision" },
  mission: { pt: "Missão", en: "Mission" },
  name: { pt: "Nome", en: "Name" },
  email: { pt: "Email", en: "Email" },
  product: { pt: "Produto", en: "Product" },
  qty: { pt: "Quantidade", en: "Quantity" },
  message: { pt: "Mensagem", en: "Message" },
  send: { pt: "Enviar encomenda", en: "Send order" },
  orderIntro: { pt: "Escolha a peça e entraremos em contacto.", en: "Pick a piece and we'll get in touch." },
  findUs: { pt: "Encontre-nos também no", en: "Also find us on" },
} as const;

type Key = keyof typeof dict;
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const s = localStorage.getItem("lang");
    if (s === "en" || s === "pt") setLangState(s);
  }, []);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("lang", l); document.documentElement.lang = l; };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[k][lang] }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);
