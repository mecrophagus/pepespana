import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Tipografía corporativa oficial de pepEspaña.
// next/font la optimiza y sirve localmente desde la build,
// evitando dependencias de Google Fonts en tiempo de ejecución.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PepEspaña | Péptidos en España",
  description:
    "Selección especializada de péptidos con información clara y atención directa en España.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}