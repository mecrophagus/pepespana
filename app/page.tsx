import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Página principal de PepEspaña.
// Aquí iremos ensamblando todos los componentes
// de la landing de producción.

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070B] text-[#F4F7FA]">
      <Navbar />
      <Hero />
    </main>
  );
}