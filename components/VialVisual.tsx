import Image from "next/image";

// Componente visual principal del vial.
// Aquí aislamos toda la lógica visual del producto para
// poder animarlo más adelante sin ensuciar Hero.tsx.

export default function VialVisual() {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center">
      {/* Glow ambiental */}
      <div className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-[#0866FF]/20 blur-[120px]" />

      {/* Contenedor del producto */}
      <div className="relative z-10 flex items-center justify-center">
        <Image
          src="/images/products/vial-hero.png"
          alt="Vial PepEspaña"
          width={520}
          height={700}
          priority
          className="h-auto w-[250px] object-contain drop-shadow-[0_30px_60px_rgba(0,102,255,0.20)] md:w-[300px] lg:w-[360px]"
        />
      </div>
    </div>
  );
}