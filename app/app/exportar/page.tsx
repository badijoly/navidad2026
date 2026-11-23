import { Download } from "lucide-react";

export const metadata = { title: "Descargar build estática" };

export default function Exportar() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-emerald-950 p-6 text-emerald-50">
      <div className="max-w-lg rounded-2xl bg-emerald-900/60 p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">
          Descargar proyecto estático (deploy)
        </h1>
        <p className="mb-6 text-sm text-emerald-200">
          ZIP con <code>index.html</code> como punto de entrada, listos para
          GitHub Pages, Netlify Drop o Vercel. Incluye el README.md en español.
          Descomprime y sube el <em>contenido</em> de la carpeta.
        </p>
        <a
          href="/amigo-secreto-familiar.zip"
          download
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 hover:bg-emerald-400"
        >
          <Download size={18} /> Descargar ZIP
        </a>
      </div>
    </main>
  );
}
