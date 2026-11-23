"use client";

import { useEffect, useState } from "react";
import { Pencil, X } from "@phosphor-icons/react";
import { loadList, saveList } from "@/lib/game";

export default function IdeasPanel({ player }: { player: string }) {
  const [items, setItems] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadList("ideas", player));
    setHydrated(true);
  }, [player]);

  useEffect(() => {
    if (hydrated) saveList("ideas", player, items);
  }, [items, hydrated, player]);

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    setItems((prev) => [...prev, t]);
    setDraft("");
  };

  const remove = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="gold-label text-[11px]">Lista para tu amigo secreto</p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-candle">
            Ideas de regalo
          </h2>
        </div>
        <Pencil size={22} className="text-gold" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-sage">
        Escribe cosas útiles que te gustaría recibir. Tu amigo secreto podrá
        ver esta lista para inspirarse.
      </p>

      {/* Ruled paper */}
      <div
        className="mt-6 rounded-lg bg-candle p-6 text-pine shadow-lg"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 31px, rgba(31,58,43,0.15) 31px, rgba(31,58,43,0.15) 32px)",
        }}
      >
        <ul className="min-h-[96px]">
          {items.length === 0 && (
            <li className="pb-2 text-sm italic text-pine/40">
              Aún no hay ideas. Agrega la primera abajo.
            </li>
          )}
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-1 text-base font-semibold"
            >
              <span>
                <span className="mr-2 text-gold">{i + 1}.</span>
                {item}
              </span>
              <button
                onClick={() => remove(i)}
                aria-label={`Quitar ${item}`}
                className="text-cranberry hover:text-cranberry/70"
              >
                <X size={18} weight="bold" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Ej: Una bella lluvia para la cocina"
            className="flex-1 rounded-md border-2 border-spruce/25 bg-white px-3 py-2 text-base outline-none placeholder:text-pine/40 focus:border-gold"
          />
          <button
            onClick={add}
            className="rounded-md bg-spruce px-4 py-2 text-sm font-bold text-candle hover:bg-spruce/85"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
