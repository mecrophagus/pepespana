"use client";

import Image from "next/image";
import { type PointerEvent, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

// Configuración del resorte que suaviza el seguimiento del cursor.
// Cuanto mayor sea stiffness, más rápido responde.
// Damping controla cuánto rebote tiene el movimiento.
const pointerSpring = {
  stiffness: 120,
  damping: 18,
  mass: 0.55,
};

export default function VialVisual() {
  // Respeta la preferencia de accesibilidad del sistema.
  // Si el usuario prefiere menos movimiento, evitamos
  // animaciones continuas e interacción 3D.
  const shouldReduceMotion = useReducedMotion();

  // Referencia al contenedor completo del visual.
  // La usamos para conocer su tamaño y posición
  // cuando calculamos dónde está el cursor.
  const visualRef = useRef<HTMLDivElement>(null);

  // Posición normalizada del puntero.
  // Los valores se mueven aproximadamente entre -1 y 1.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Suavizamos los valores del cursor mediante springs
  // para evitar movimientos bruscos o demasiado mecánicos.
  const smoothX = useSpring(pointerX, pointerSpring);
  const smoothY = useSpring(pointerY, pointerSpring);

  // Convertimos la posición del cursor en rotación 3D.
  // El efecto es deliberadamente limitado para que el PNG
  // no revele demasiado que realmente es una imagen plana.
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  // Pequeño desplazamiento adicional para reforzar
  // la sensación de profundidad y parallax.
  const translateX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const translateY = useTransform(smoothY, [-1, 1], [-5, 5]);

  // Posición del reflejo dinámico sobre el vial.
  // El highlight se mueve en función de la posición del cursor.
  const highlightX = useTransform(smoothX, [-1, 1], [38, 62]);
  const highlightY = useTransform(smoothY, [-1, 1], [38, 62]);

  // Construimos dinámicamente un radial-gradient que simula
  // cómo una fuente de luz se desplaza sobre la superficie.
  const highlight = useTransform(
    [highlightX, highlightY],
    ([x, y]) =>
      `radial-gradient(
        circle at ${x}% ${y}%,
        rgba(255,255,255,0.2) 0%,
        rgba(53,194,255,0.08) 20%,
        transparent 54%
      )`,
  );

  // Calcula la posición relativa del cursor dentro del visual.
  // Touch queda excluido para no interferir con el scroll móvil.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType === "touch") return;

    const bounds = visualRef.current?.getBoundingClientRect();

    if (!bounds) return;

    pointerX.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
    );

    pointerY.set(
      ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    );
  }

  // Cuando el cursor abandona el área del Hero,
  // devolvemos progresivamente el vial a su posición neutra.
  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      ref={visualRef}
      className="group relative flex min-h-[340px] touch-pan-y items-center justify-center md:min-h-[420px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}

      // Entrada inicial del visual al cargar la página.
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.94,
              y: 24,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1],
      }}

      // Necesitamos perspectiva para que rotateX / rotateY
      // produzcan una sensación tridimensional creíble.
      style={{ perspective: 1000 }}
    >
      {/* Glow principal.
          Usamos radial-gradient en lugar de un simple blur grande
          para conseguir un halo más limpio y menos pixelado. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-[90%] w-[90%] max-w-[540px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(53,194,255,0.24) 0%, rgba(8,102,255,0.12) 36%, rgba(8,102,255,0.035) 58%, transparent 74%)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [0.96, 1.06, 0.96],
                opacity: [0.72, 1, 0.72],
              }
        }
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Luz/reflejo inferior.
          Ayuda a anclar el vial y evita que parezca
          simplemente una imagen flotando sobre el fondo. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] h-[16%] w-[58%] max-w-[300px] rounded-[50%] blur-[18px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(8,102,255,0.34) 0%, rgba(8,102,255,0.1) 42%, transparent 72%)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scaleX: [0.9, 1.08, 0.9],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Capa de interacción 3D.
          Esta capa responde al cursor mediante rotateX,
          rotateY y pequeños desplazamientos. */}
      <motion.div
        className="relative z-10 flex -translate-y-8 items-center justify-center md:translate-y-0"
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        {/* Capa de idle animation.
            Independiente del cursor para que el vial
            siga teniendo vida incluso sin interacción. */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -9, 0],
                  rotateZ: [-0.7, 0.7, -0.7],
                  scale: [1, 1.012, 1],
                }
          }

          // Hover adicional muy sutil.
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.025,
                }
          }
          transition={{
            duration: 6.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Asset principal del Hero */}
          <Image
            src="/images/products/vial-hero-mobile.png"
            alt="Vial PepEspaña"
            width={800}
            height={1000}
            priority
            draggable={false}
            className="h-auto w-[280px] select-none object-contain drop-shadow-[0_34px_60px_rgba(0,102,255,0.24)] md:w-[330px] lg:w-[410px]"
          />

          {/* Reflejo dinámico.
              Se desplaza siguiendo el puntero para reforzar
              la ilusión de volumen y cambio de iluminación. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%_18%] rounded-[45%] mix-blend-screen"
            style={{
              background: highlight,
              opacity: shouldReduceMotion ? 0.18 : 0.55,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}