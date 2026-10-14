import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/content/site";

const dict = {
  home: { pt: "Início", en: "Home" },
  portfolio: { pt: "Portfólio", en: "Portfolio" },
  fairs: { pt: "Feiras", en: "Fairs" },
  about: { pt: "Sobre", en: "About" },
  order: { pt: "Encomendar", en: "Order" },
  welcome: { pt: "🤎 Bem-vindos ao Alentejo Vintage & Rústico 🤎", en: "🤎 Welcome to Alentejo Vintage & Rústico 🤎" },
  tagline: {
    pt: "Criei esta página para partilhar o meu gosto por peças vintage, rústicas e intemporais — aquelas peças que nos fazem parar, recordar e imaginar as histórias que já viveram.\n\nGosto de objetos com personalidade, dos pequenos detalhes, da cerâmica antiga, do vidro, da madeira, da renda e de tudo aquilo que traz um bocadinho de alma para dentro de uma casa. 🏺🌿\n\nAqui vou partilhar peças que vou encontrando e escolhendo com carinho, sempre à procura daquele encanto especial que não se encontra numa peça nova.",
    en: "I created this page to share my love for vintage, rustic and timeless pieces — the kind that make us pause, remember and imagine the stories they have already lived.\n\nI love objects with personality, the small details, old ceramics, glass, wood, lace and everything that brings a little soul into a home. 🏺🌿\n\nHere I'll share pieces I find and choose with care, always looking for that special charm you can't find in something new.",
  },
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
// Default value keeps components working if rendered outside the provider (e.g. after hot reload).
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "pt",
  setLang: () => {},
  t: (k) => dict[k].pt,
});

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
