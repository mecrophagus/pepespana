
// Barra de navegación principal de PepEspaña.
// La mantenemos como componente independiente para poder
// reutilizarla y modificarla sin tocar el resto de la página.
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#05070B]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        

        {/* Firma horizontal oficial de pepEspaña.
    Usamos la versión negativa porque el Navbar vive
    permanentemente sobre una superficie oscura. */}
<a
  href="#inicio"
  className="inline-flex shrink-0 items-center"
>
  <Image
    src="/brand/pepespana-logo-web-white.svg"
    alt="pepEspaña"
    width={640}
    height={160}
    className="h-auto w-[136px] md:w-[152px]"
  />
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
          className="inline-flex items-center justify-center rounded-full bg-brand-ink px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-[#1D4B6E] hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua"
        >
          Contactar
         </a>

      </nav>
    </header>
  );
}