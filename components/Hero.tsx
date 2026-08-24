// Hero principal de PepEspaña.
// Concentra el mensaje principal y los CTAs.
// En desktop, el vial pertenece al escenario compartido IntroJourney;
// en mobile/tablet mantenemos una versión local simplificada.

import VialVisual from "@/components/VialVisual";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 lg:px-10"
    >
      {/* Glow decorativo de fondo.
          Refuerza la atmósfera Dark Biotech y conecta
          visualmente el contenido con la iluminación del vial. */}
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-[#0866FF]/20 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-2">
        {/* Columna de contenido */}
        <div className="relative z-10">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#35C2FF]">
            PEP / ESP — 001
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            PÉPTIDOS
            <br />
            EN ESPAÑA.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-[#8D99A8] md:text-lg">
            Una selección especializada con información clara y atención directa
            en España.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#productos"
              className="rounded-full bg-[#35C2FF] px-6 py-3 text-sm font-semibold text-[#05070B] transition-transform hover:scale-[1.03]"
            >
              Ver productos
            </a>

            <a
              href="#contacto"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30"
            >
              Contactar
            </a>
          </div>
        </div>

        {/* Mobile y tablet mantienen el visual dentro del Hero.
            La narrativa completa de scroll empieza en desktop. */}
        <div className="lg:hidden">
          <VialVisual />
        </div>

        {/* En desktop reservamos la columna visual.
            El vial real se renderiza desde VialJourney por encima
            de Hero + Statement. */}
        <div
          aria-hidden="true"
          className="hidden min-h-[520px] lg:block"
        />
      </div>
    </section>
  );
}