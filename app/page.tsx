import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Statement from "@/components/Statement";
import IntroJourney from "@/components/IntroJourney";

// Página principal de PepEspaña.
// Aquí iremos ensamblando todos los componentes
// de la landing de producción.

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070B] text-[#F4F7FA]">
      <Navbar />
      <IntroJourney>    
        <Hero />
        <Statement />
      </IntroJourney>
      
      <Products />
    </main>
  );
}