"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import VialVisual from "@/components/VialVisual";

type VialJourneyProps = {
  progress: MotionValue<number>;
};

export default function VialJourney({
  progress,
}: VialJourneyProps) {
  const shouldReduceMotion = useReducedMotion();

  /*
   * NARRATIVA DEL RECORRIDO
   *
   * 0.00 ─ 0.18
   * Hero estable.
   *
   * 0.18 ─ 0.48
   * Viaje diagonal derecha → izquierda.
   *
   * 0.48 ─ 0.66
   * Pausa visual dentro de Statement.
   *
   * 0.66 ─ 0.92
   * Salida del vial.
   *
   * 0.92 ─ 1.00
   * Products queda completamente limpio.
   */

  // El vial parte aproximadamente del centro de la columna
  // derecha del Hero y viaja hacia la zona izquierda de Statement.
  const journeyX = useTransform(
    progress,
    [0, 0.18, 0.48, 0.66, 0.92, 1],
    ["0vw", "0vw", "-49vw", "-49vw", "-52vw", "-52vw"],
  );

  // Bajada diagonal durante la transición y segunda deriva
  // cuando abandona Statement.
  const journeyY = useTransform(
    progress,
    [0, 0.18, 0.48, 0.66, 0.92, 1],
    ["0vh", "0vh", "10vh", "10vh", "28vh", "30vh"],
  );

  // Llega al Statement con menor jerarquía visual,
  // pero permanece suficientemente grande para acompañar el mensaje.
  const journeyScale = useTransform(
    progress,
    [0, 0.18, 0.48, 0.66, 0.92, 1],
    [1, 1, 0.72, 0.72, 0.5, 0.5],
  );

  // Giro editorial pequeño.
  // No superamos valores agresivos porque seguimos utilizando
  // un PNG 2D y no un modelo tridimensional real.
  const journeyRotate = useTransform(
    progress,
    [0, 0.18, 0.48, 0.66, 0.92, 1],
    [0, 0, -5, -5, -8, -8],
  );

  // Durante la pausa del Statement permanece completamente visible.
  // La desaparición ocurre únicamente al acercarnos a Products.
  const journeyOpacity = useTransform(
    progress,
    [0, 0.66, 0.82, 0.94, 1],
    [1, 1, 0.72, 0, 0],
  );

  // Reduced motion mantiene el vial en su posición original
  // y utiliza únicamente una desaparición sencilla.
  const reducedOpacity = useTransform(
    progress,
    [0, 0.42, 0.52],
    [1, 1, 0],
  );

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full"
    >
      {/*
       * Punto de partida:
       * 75% horizontal ≈ centro de la columna derecha.
       * 50% vertical ≈ centro del Hero.
       *
       * Este wrapper mantiene el punto de anclaje separado
       * de las transformaciones de Motion.
       */}
      <div className="absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          // El escenario general ignora pointer events,
          // pero el vial recupera interacción para conservar
          // el pointer tracking del Hero.
          className="pointer-events-auto"
          style={
            shouldReduceMotion
              ? {
                  opacity: reducedOpacity,
                }
              : {
                  x: journeyX,
                  y: journeyY,
                  scale: journeyScale,
                  rotateZ: journeyRotate,
                  opacity: journeyOpacity,
                }
          }
        >
          <VialVisual />
        </motion.div>
      </div>
    </div>
  );
}