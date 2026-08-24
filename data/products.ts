// Estructura obligatoria para cada producto.
// Esto evita que podamos añadir un producto sin slug,
// imagen o texto alternativo accesible.

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
};


// Fuente centralizada de datos para el catálogo de PepEspaña.
// Mantener estos datos separados del JSX facilita SEO,
// mantenimiento, reutilización y futuras ampliaciones del catálogo.

export const products: Product[] = [
  {
    id: "01",
    name: "Tesamorelina",
    slug: "tesamorelina",
    image: "/images/products/tesamorelina-vial.png",
    imageAlt: "Vial de Tesamorelina",
  },
  {
    id: "02",
    name: "Ipamorelina",
    slug: "ipamorelina",
    image: "/images/products/ipamorelina-vial.png",
    imageAlt: "Vial de Ipamorelina",
  },
  {
    id: "03",
    name: "Retatrutida",
    slug: "retatrutida",
    image: "/images/products/retatrutida-vial.png",
    imageAlt: "Vial de Retatrutida",
  },
  {
    id: "04",
    name: "BPC-157",
    slug: "bpc-157",
    image: "/images/products/bpc-157-vial.png",
    imageAlt: "Vial de BPC-157",
  },
  {
    id: "05",
    name: "Tirzepatida",
    slug: "tirzepatida",
    image: "/images/products/tirzepatida-vial.png",
    imageAlt: "Vial de Tirzepatida",
  },
  {
    id: "06",
    name: "MOTS-C",
    slug: "mots-c",
    image: "/images/products/mots-c-vial.png",
    imageAlt: "Vial de MOTS-C",
  },
  {
    id: "07",
    name: "Semaglutida",
    slug: "semaglutida",
    image: "/images/products/semaglutida-vial.png",
    imageAlt: "Vial de Semaglutida",
  },
];