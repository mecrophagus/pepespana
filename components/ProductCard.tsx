import Image from "next/image";

// Datos obligatorios que necesita cada tarjeta de producto.
type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
};

export default function ProductCard({
  id,
  name,
  image,
  imageAlt,
}: ProductCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#35C2FF]/35 hover:bg-white/[0.045]">
      {/* Glow ambiental interno.
          Solo gana presencia cuando el usuario interactúa con la card. */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0866FF]/0 blur-[90px] transition-all duration-700 group-hover:bg-[#0866FF]/15" />

      {/* Número editorial del producto */}
      <span className="relative z-10 text-xs tracking-[0.28em] text-[#35C2FF]">
        {id}
      </span>

      {/* Zona visual del producto */}
      <div className="relative mt-6 flex min-h-[320px] items-center justify-center overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          width={500}
          height={650}
          className="relative z-10 h-auto w-[260px] select-none object-contain transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.055] md:w-[280px]"
        />
      </div>

      {/* Información del producto */}
      <div className="relative z-10 mt-6 border-t border-white/10 pt-5">
        <h3 className="text-xl font-semibold tracking-tight text-[#F4F7FA]">
          {name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#8D99A8]">
          Información detallada disponible mediante atención directa.
        </p>

        <a
          href="#contacto"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#35C2FF] transition-all duration-300 group-hover:gap-3"
        >
          Consultar producto
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}