"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
} from "react";

import {
  type MotionValue,
  useScroll,
  useSpring,
} from "motion/react";

import VialJourney from "@/components/VialJourney";

// El scroll necesita una respuesta algo más pesada que el puntero.
// Buscamos inercia cinematográfica, no seguimiento instantáneo.
const journeySpring = {
  stiffness: 85,
  damping: 26,
  mass: 0.9,
};

// Contexto compartido para que todos los elementos de la escena
// utilicen exactamente el mismo progreso de scroll.
const IntroJourneyProgressContext =
  createContext<MotionValue<number> | null>(null);

// Hook utilizado por los componentes que necesitan participar
// en la misma coreografía Hero → Statement → Products.
export function useIntroJourneyProgress() {
  const progress = useContext(IntroJourneyProgressContext);

  if (!progress) {
    throw new Error(
      "useIntroJourneyProgress debe utilizarse dentro de IntroJourney.",
    );
  }

  return progress;
}

type IntroJourneyProps = {
  children: ReactNode;
};

export default function IntroJourney({
  children,
}: IntroJourneyProps) {
  // Hero + Statement forman una única escena de scroll.
  const journeyRef = useRef<HTMLDivElement>(null);

  // 0 = inicio del Hero.
  // 1 = final del Statement.
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end start"],
  });

  // Este será el reloj compartido de toda la secuencia.
  const smoothProgress = useSpring(
    scrollYProgress,
    journeySpring,
  );

  return (
    <IntroJourneyProgressContext.Provider value={smoothProgress}>
      <div ref={journeyRef} className="relative">
        {/* Contenido semántico normal */}
        {children}

        {/* Escenario visual compartido para desktop */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            <VialJourney progress={smoothProgress} />
          </div>
        </div>
      </div>
    </IntroJourneyProgressContext.Provider>
  );
}