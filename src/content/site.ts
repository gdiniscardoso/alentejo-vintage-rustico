import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export type Lang = "pt" | "en";
type T = { pt: string; en: string };

// Edit this file to customize the site content.
export const site = {
  instagram: "https://instagram.com/",
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

export type Category = "bottles" | "decor" | "vintage";
export const categories: Record<Category, T> = {
  bottles: { pt: "Garrafas", en: "Bottles" },
  decor: { pt: "Decoração", en: "Decor" },
  vintage: { pt: "Vintage", en: "Vintage" },
};

export const products: { id: string; name: T; category: Category; price: number; image: string; available: boolean }[] = [
  { id: "flores", name: { pt: "Garrafa Flores Secas", en: "Dried Flowers Bottle" }, category: "bottles", price: 18, image: p1, available: true },
  { id: "azulejo", name: { pt: "Garrafa Azulejo", en: "Azulejo Bottle" }, category: "bottles", price: 25, image: p2, available: true },
  { id: "tabuleiro", name: { pt: "Tabuleiro Rústico", en: "Rustic Tray" }, category: "vintage", price: 32, image: p3, available: true },
  { id: "vela", name: { pt: "Porta-velas de Cortiça", en: "Cork Candle Holder" }, category: "decor", price: 9, image: p3, available: false },
];

export const fairs: { date: string; name: string; place: string }[] = [
  { date: "2026-11-07", name: "Feira de Artesanato de Évora", place: "Praça do Giraldo, Évora" },
  { date: "2026-11-21", name: "Mercado de Natal", place: "Estremoz" },
  { date: "2026-12-12", name: "Feira Medieval", place: "Monsaraz" },
];
