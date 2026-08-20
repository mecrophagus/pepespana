
// Barra de navegación principal de PepEspaña.
// La mantenemos como componente independiente para poder
// reutilizarla y modificarla sin tocar el resto de la página.

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#05070B]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        
        {/* Marca provisional.
            Más adelante sustituiremos este texto por el logo definitivo. */}
        <a
          href="#inicio"
          className="text-lg font-semibold tracking-tight text-[#F4F7FA]"
        >
          PepEspaña
        </a>

        {/* Navegación principal.
            En móvil la ocultamos temporalmente hasta construir
            el menú responsive. */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#productos"
            className="text-sm text-[#8D99A8] transition-colors hover:text-white"
          >
            Productos
          </a>

          <a
            href="#calidad"
            className="text-sm text-[#8D99A8] transition-colors hover:text-white"
          >
            Calidad
          </a>

          <a
            href="#contacto"
            className="text-sm text-[#8D99A8] transition-colors hover:text-white"
          >
            Contacto
          </a>
        </div>

        {/* CTA principal */}
        <a
          href="#contacto"
          className="rounded-full bg-[#35C2FF] px-5 py-2.5 text-sm font-semibold text-[#05070B] transition-transform hover:scale-[1.03]"
        >
          Contactar
        </a>

      </nav>
    </header>
  );
}