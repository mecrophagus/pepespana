import StatementReveal from "@/components/StatementReveal";

// Contenedor semántico del Statement.
// La estructura de sección permanece separada de la lógica
// cliente encargada de sincronizar las entradas con el scroll.

export default function Statement() {
  return (
    <section
      aria-labelledby="statement-title"
      className="relative overflow-hidden"
    >
      <StatementReveal />
    </section>
  );
}