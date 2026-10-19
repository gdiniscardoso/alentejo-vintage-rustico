import i0 from "@/assets/ig-0.jpg";
import i1 from "@/assets/ig-1.jpg";
import i3 from "@/assets/ig-3.jpg";
import i4 from "@/assets/ig-4.jpg";
import i5 from "@/assets/ig-5.jpg";
import i6 from "@/assets/ig-6.jpg";
import i7 from "@/assets/ig-7.jpg";
import i8 from "@/assets/ig-8.jpg";
import i9 from "@/assets/ig-9.jpg";
import i11 from "@/assets/ig-11.jpg";

export type Lang = "pt" | "en";
type T = { pt: string; en: string };

// Edit this file to customize the site content.
export const site = {
  instagram: "https://www.instagram.com/alentejovintage.rustico/",
  vinted: "https://www.vinted.pt/",
  email: "ola@alentejovintage.pt",
  vision: {
    pt: "Dar nova vida ao que o tempo guardou, com as mãos e a alma do Alentejo.",
    en: "Giving new life to what time has kept, with the hands and soul of the Alentejo.",
  } as T,
  mission: {
    pt: "Criar peças únicas e sustentáveis, feitas à mão, que contam histórias.",
    en: "Creating unique, sustainable, handmade pieces that tell stories.",
  } as T,
};

export type Category = "tableware" | "decor" | "art";
export const categories: Record<Category, T> = {
  tableware: { pt: "Louça", en: "Tableware" },
  decor: { pt: "Decoração", en: "Decor" },
  art: { pt: "Arte", en: "Art" },
};

// price: leave undefined to show "price on request"
export const products: { id: string; name: T; category: Category; price?: number; image: string; available: boolean }[] = [
  { id: "taca-comptoir", name: { pt: "Taça de flores campestres Comptoir de Famille", en: "Comptoir de Famille country flowers bowl" }, category: "tableware", image: i0, available: true },
  { id: "gravura-1846", name: { pt: "Gravura antiga séc. XIX “Été” (c. 1846), moldura dourada", en: "19th-century engraving “Été” (c. 1846), gilt frame" }, category: "art", image: i1, available: true },
  { id: "rb-alcobaca", name: { pt: "Conjunto decorativo Raul da Bernarda – Alcobaça", en: "Raul da Bernarda decorative set – Alcobaça" }, category: "decor", image: i4, available: true },
  { id: "cesto-alcobaca", name: { pt: "Cesto em cerâmica de Alcobaça com flores em relevo", en: "Alcobaça ceramic basket with raised flowers" }, category: "decor", image: i5, available: true },
  { id: "pratos-terre-de-fer", name: { pt: "Pratos faiança com rosas Terre de Fer – Choisy-le-Roi", en: "Terre de Fer rose faience plates – Choisy-le-Roi" }, category: "tableware", image: i6, available: true },
  { id: "limoges-candeeiros", name: { pt: "Covilhete Limoges ouro 24KT e par de candeeiros em latão", en: "Limoges 24KT gold dish and pair of brass lamps" }, category: "decor", image: i7, available: true },
  { id: "broadhurst", name: { pt: "Chávena e pires Broadhurst Staffordshire", en: "Broadhurst Staffordshire cup and saucer" }, category: "tableware", image: i8, available: true },
  { id: "taca-dourada", name: { pt: "Taça em porcelana com asas douradas", en: "Porcelain bowl with gold handles" }, category: "decor", image: i3, available: true },
  { id: "travessa-azul", name: { pt: "Travessa inglesa azul e branca", en: "Blue and white English platter" }, category: "tableware", image: i11, available: true },
  { id: "prato-molheira", name: { pt: "Prato e molheira em faiança azul e branca", en: "Blue and white faience plate and gravy boat" }, category: "tableware", image: i9, available: false },
];

export const fairs: { date: string; name: string; place: string }[] = [
  { date: "2026-11-07", name: "Feira de Artesanato de Évora", place: "Praça do Giraldo, Évora" },
  { date: "2026-11-21", name: "Mercado de Natal", place: "Estremoz" },
  { date: "2026-12-12", name: "Feira Medieval", place: "Monsaraz" },
];
