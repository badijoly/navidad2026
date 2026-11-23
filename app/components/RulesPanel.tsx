"use client";

import { CheckCircle, Gift, Lock, CalendarCheck } from "@phosphor-icons/react";

const RULES = [
  {
    icon: Gift,
    title: "El regalo",
    text: "Compra un regalo entre $20.000 y $50.000 pesos chilenos.",
  },
  {
    icon: Lock,
    title: "El secreto",
    text: "Nunca reveles quién es tu amigo secreto, ni siquiera por accidente.",
  },
  {
    icon: CalendarCheck,
    title: "La fecha",
    text: "Ten el regalo listo para la noche de Navidad, sin excepciones.",
  },
];

export default function RulesPanel({
  checked,
  onCheck,
}: {
  checked: boolean;
  onCheck: (v: boolean) => void;
}) {
  return (
    <div>
      <p className="gold-label text-[11px]">Las reglas del juego</p>
      <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-candle md:text-4xl">
        Tres promesas navideñas
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {RULES.map((r, i) => (
          <div key={r.title} className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/60 bg-spruce text-gold">
              <r.icon size={26} weight="regular" />
            </div>
            <span className="font-display absolute right-0 top-0 text-4xl font-semibold text-gold/30">
              0{i + 1}
            </span>
            <h3 className="font-display mt-4 text-xl font-semibold text-gold">
              {r.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-rose">{r.text}</p>
          </div>
        ))}
      </div>

      <label className="mt-10 flex cursor-pointer items-center gap-4 rounded-xl border border-gold/40 bg-pine/40 p-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            onCheck(!checked);
          }}
          aria-pressed={checked}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border-2 transition-colors ${
            checked
              ? "border-gold bg-gold text-pine"
              : "border-gold/60 bg-transparent text-transparent"
          }`}
        >
          <CheckCircle size={18} weight="bold" />
        </button>
        <span className="text-base font-bold leading-snug text-candle">
          Me comprometo a tener el regalo listo para la noche de Navidad
        </span>
      </label>
    </div>
  );
}
