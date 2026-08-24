"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// La animación de Quality es local a la propia sección.
// No necesita participar en la timeline global de IntroJourney.
const qualitySpring = {
  stiffness: 95,
  damping: 24,
  mass: 0.8,
};

// Sección de calidad de PepEspaña.
// Mantiene una entrada editorial suave sin competir
// con la narrativa cinematográfica del Hero y Statement.
export default function Quality() {
  const qualityRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      id: "01",
      title: "Información clara",
      description:
        "Presentamos cada referencia de forma directa, evitando sobrecargar la experiencia con mensajes innecesarios o afirmaciones no verificadas.",
    },
    {
      id: "02",
      title: "Atención directa",
      description:
        "Cada consulta puede dirigirse al producto concreto para recibir información adicional mediante los canales de atención de PepEspaña.",
    },
    {
      id: "03",
      title: "Criterio antes que ruido",
      description:
        "La experiencia prioriza una presentación ordenada, comprensible y coherente frente a promesas genéricas o comunicación excesiva.",
    },
  ];

  // Progreso local de la sección.
  // Empieza a reaccionar cuando Quality entra en la parte inferior
  // del viewport y termina cuando se aproxima a su posición de lectura.
  const { scrollYProgress } = useScroll({
    target: qualityRef,
    offset: ["start 85%", "start 20%"],
  });

  const progress = useSpring(scrollYProgress, qualitySpring);

  // Columna editorial izquierda.
  const contentX = useTransform(
    progress,
    [0, 0.75],
    [-90, 0],
  );

  const contentOpacity = useTransform(
    progress,
    [0, 0.25, 0.8],
    [0, 0.08, 1],
  );

  // Lista derecha.
  // Empieza un poco más tarde para evitar que ambos lados
  // se materialicen exactamente al mismo tiempo.
  const listX = useTransform(
    progress,
    [0.12, 0.9],
    [110, 0],
  );

  const listOpacity = useTransform(
    progress,
    [0.12, 0.4, 0.95],
    [0, 0.08, 1],
  );

  // Línea superior de transición.
  const lineScale = useTransform(
    progress,
    [0, 0.55],
    [0, 1],
  );

  return (
    <section
      ref={qualityRef}
      id="calidad"
      aria-labelledby="quality-title"
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:px-10 lg:py-40"
    >
      {/* Separador ambiental.
          Aparece progresivamente durante la entrada de la sección. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={
          shouldReduceMotion
            ? undefined
            : {
                scaleX: lineScale,
              }
        }
      />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* La columna principal llega desde la izquierda
              y gana opacidad de forma progresiva. */}
          <motion.div
            className="max-w-xl"
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: contentX,
                    opacity: contentOpacity,
                  }
            }
          >
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[#35C2FF]">
              Calidad / 002
            </p>

            <h2
              id="quality-title"
              className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#F4F7FA] md:text-5xl lg:text-6xl"
            >
              Criterio antes
              <br />
              <span className="text-[#8D99A8]">
                que promesas.
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-base leading-7 text-[#8D99A8] md:text-lg md:leading-8">
              La confianza también se construye explicando con claridad qué
              información está disponible y facilitando un contacto directo
              cuando se necesita profundizar.
            </p>
          </motion.div>

          {/* La lista entra desde el lado contrario.
              Conservamos las filas editoriales en lugar de volver
              al lenguaje visual de cards utilizado en Products. */}
          <motion.div
            className="border-t border-white/10"
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: listX,
                    opacity: listOpacity,
                  }
            }
          >
            {principles.map((principle) => (
              <article
                key={principle.id}
                className="group grid gap-5 border-b border-white/10 py-8 transition-colors duration-300 md:grid-cols-[70px_1fr] md:py-10"
              >
                <span className="text-xs tracking-[0.28em] text-[#35C2FF]">
                  {principle.id}
                </span>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#F4F7FA] transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                    {principle.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#8D99A8] md:text-base md:leading-7">
                    {principle.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}