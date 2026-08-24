// Sección editorial de transición entre el Hero y el catálogo.
// Su función es reducir la intensidad visual del Hero y preparar
// al usuario para entrar en la zona de productos.

export default function Statement() {
  return (
    <section
      aria-labelledby="statement-title"
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:px-10 lg:py-40"
    >
      {/* Línea ambiental que conecta visualmente Hero y contenido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-20">
          {/* Identificador editorial */}
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#35C2FF]">
              PepEspaña / Enfoque
            </p>
          </div>

          {/* Mensaje principal */}
          <div className="max-w-4xl">
            <h2
              id="statement-title"
              className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#F4F7FA] md:text-5xl lg:text-6xl"
            >
              Menos ruido.
              <br />
              <span className="text-[#8D99A8]">Más claridad.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-7 text-[#8D99A8] md:text-lg md:leading-8">
              PepEspaña presenta su catálogo mediante una experiencia directa,
              visual y fácil de explorar, con acceso claro a cada producto y a
              sus canales de atención.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}