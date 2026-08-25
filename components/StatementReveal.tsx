"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { useIntroJourneyProgress } from "@/components/IntroJourney";

export default function StatementReveal() {
  const shouldReduceMotion = useReducedMotion();

  // Statement utiliza exactamente el mismo reloj que VialJourney.
  // Ya no existe una segunda medición de scroll que pueda
  // adelantarse o retrasarse respecto al vial.
  const progress = useIntroJourneyProgress();

  /*
   * TIMELINE COMPARTIDO
   *
   * VialJourney:
   *
   * 0.00 ─ 0.18  Hero estable
   * 0.18 ─ 0.48  viaje hacia Statement
   * 0.48 ─ 0.66  vial instalado / pausa
   * 0.66 ─ 0.92  salida
   *
   * El contenido de Statement termina de materializarse
   * aproximadamente cuando el vial llega a su posición.
   */

  // La línea abre lentamente durante el viaje.
  const lineScale = useTransform(
    progress,
    [0.14, 0.44],
    [0, 1],
  );

  // Identificador editorial: izquierda → posición final.
  const eyebrowX = useTransform(
    progress,
    [0.18, 0.48],
    [-80, 0],
  );

  // La opacidad tarda prácticamente todo el viaje del vial.
  const eyebrowOpacity = useTransform(
    progress,
    [0.18, 0.32, 0.5],
    [0, 0.12, 1],
  );

  // El titular entra desde el lado contrario.
  const titleX = useTransform(
    progress,
    [0.2, 0.52],
    [120, 0],
  );

  // Deliberadamente más lenta que antes.
  // No alcanza presencia completa hasta después
  // de que el vial prácticamente haya aterrizado.
  const titleOpacity = useTransform(
    progress,
    [0.2, 0.36, 0.54],
    [0, 0.08, 1],
  );

  // El párrafo es el último elemento en asentarse.
  const bodyX = useTransform(
    progress,
    [0.28, 0.6],
    [80, 0],
  );

  const bodyOpacity = useTransform(
    progress,
    [0.28, 0.44, 0.62],
    [0, 0.05, 1],
  );

  return (
    <div className="relative flex min-h-[85vh] items-center px-6 py-24 md:py-32 lg:min-h-screen lg:px-10 lg:py-40">
      {/* Línea ambiental de transición */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 origin-center bg-linear-to-r from-transparent via-white/10 to-transparent"
        style={
          shouldReduceMotion
            ? undefined
            : {
                scaleX: lineScale,
              }
        }
      />

      <div className="mx-auto w-full max-w-350">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          {/* Zona izquierda reservada también para la llegada del vial */}
          <motion.div
            className="relative lg:min-h-105"
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: eyebrowX,
                    opacity: eyebrowOpacity,
                  }
            }
          >
            <p className="text-xs uppercase tracking-[0.32em] text-brand-aqua">
              PepEspaña / Enfoque
            </p>
          </motion.div>

          {/* Zona editorial derecha */}
          <div className="max-w-4xl">
            <motion.h2
              id="statement-title"
              className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#F4F7FA] md:text-5xl lg:text-6xl"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: titleX,
                      opacity: titleOpacity,
                    }
              }
            >
              Menos ruido.
              <br />

              <span className="text-brand-aqua">
                Más claridad.
              </span>
            </motion.h2>

            <motion.p
              className="mt-8 max-w-2xl text-base leading-7 text-brand-aqua md:text-lg md:leading-8"
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: bodyX,
                      opacity: bodyOpacity,
                    }
              }
            >
              PepEspaña presenta su catálogo mediante una experiencia directa,
              visual y fácil de explorar, con acceso claro a cada producto y a
              sus canales de atención.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}