export type Lang = "pt" | "en";
type T = { pt: string; en: string };

// Edit this file for static site text; portfolio items and fairs live in /content (edited via /admin).
export const site = {
  instagram: "https://www.instagram.com/alentejovintage.rustico/",
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

// Products and fairs are JSON files in /content, edited through the admin at /admin.
// price: leave undefined to show "price on request"
export type Product = {
  id: string;
  name: T;
  category: Category;
  price?: number;
  image: string;
  available: boolean;
};
type ProductFile = Omit<Product, "id"> & { added?: string };

const slug = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.json$/, "");

const productFiles = import.meta.glob<ProductFile>("/content/products/*.json", {
  eager: true,
  import: "default",
});
export const products: Product[] = Object.entries(productFiles)
  .sort(([, a], [, b]) => (b.added ?? "").localeCompare(a.added ?? ""))
  .map(([path, file]) => {
    const { added, ...p } = file;
    void added;
    return { ...p, id: slug(path) };
  });

export type Fair = { date: string; name: string; place: string };
const fairFiles = import.meta.glob<Fair>("/content/fairs/*.json", {
  eager: true,
  import: "default",
});
export const fairs: Fair[] = Object.values(fairFiles).sort((a, b) => a.date.localeCompare(b.date));
