import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

// Sección principal del catálogo.
// Recorremos los datos de products.ts y generamos
// una tarjeta reutilizable por cada producto.

export default function Products() {
  return (
    <section
      id="productos"
      className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32"
    >
      {/* Cabecera de sección */}
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-aqua">
            Catálogo
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-[#F4F7FA] md:text-5xl lg:text-6xl">
            Selección especializada.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#8D99A8] md:text-lg">
            Consulta nuestra selección disponible y solicita información
            directamente sobre cada producto.
          </p>
        </div>

        {/* Grid responsive de productos */}
{/* Grid responsive del catálogo.
    Cada card ocupa dos columnas internas.
    La última card se coloca explícitamente en el centro. */}
<div className="grid gap-6 md:grid-cols-4 xl:grid-cols-6">
  {products.map((product) => {
    const isLastProduct = product.id === "07";

    return (
      <div
        key={product.id}
        className={
          isLastProduct
            ? "md:col-span-2 md:col-start-2 xl:col-span-2 xl:col-start-3"
            : "md:col-span-2"
        }
      >
        <ProductCard
          id={product.id}
          name={product.name}
          image={product.image}
          imageAlt={product.imageAlt}
        />
      </div>
    );
  })}
</div>
      </div>
    </section>
  );
}