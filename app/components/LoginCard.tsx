"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { findPlayer, PLAYERS } from "@/lib/game";

export default function LoginCard() {
  const [name, setName] = useState("");
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const press = (d: string) => {
    setError("");
    setDigits((prev) => {
      if (prev.length >= 4) return prev;
      return [...prev, d];
    });
  };

  const clear = () => {
    setDigits([]);
    setError("");
  };

  const submit = () => {
    const player = findPlayer(name, digits.join(""));
    if (!player) {
      setError("Nombre o clave incorrecta. Inténtalo de nuevo.");
      setShake(true);
      setDigits([]);
      setTimeout(() => setShake(false), 500);
      return;
    }
    localStorage.setItem("asf_session", player.name);
    window.location.href = "/jugador";
  };

  return (
    <motion.div
      animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-[480px] rotate-2 rounded-2xl border border-gold/30 bg-candle p-8 text-pine shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
    >
      {/* hanging string */}
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 hidden h-16 w-px bg-gradient-to-b from-transparent to-gold lg:block"
      />
      <div
        aria-hidden
        className="absolute -top-2 left-1/2 hidden h-4 w-4 -translate-x-1/2 rotate-45 border border-gold/60 bg-gold/20 lg:block"
      />

      <p className="gold-label text-[11px] !text-cranberry">
        Ingresa al juego
      </p>
      <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight">
        Tu tarjeta secreta
      </h2>

      <label className="mt-6 block text-sm font-bold text-pine/70">
        Tu nombre
      </label>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        placeholder="Ej: Gabriel"
        className="mt-2 w-full rounded-lg border-2 border-spruce/25 bg-white/70 px-4 py-3 text-base font-semibold outline-none placeholder:font-normal placeholder:text-pine/40 focus:border-gold"
      />

      <label className="mt-5 block text-sm font-bold text-pine/70">
        Clave de 4 dígitos
      </label>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-xl font-bold ${
                digits[i]
                  ? "border-gold bg-gold/20"
                  : "border-spruce/25 bg-white/70"
              }`}
            >
              {digits[i] ? "•" : ""}
            </div>
          ))}
        </div>
        {digits.length > 0 && (
          <button
            onClick={clear}
            className="text-sm font-bold text-cranberry underline"
          >
            Borrar
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <PinKey key={d} label={d} onClick={() => press(d)} />
        ))}
        <PinKey label="⌫" onClick={() => setDigits((p) => p.slice(0, -1))} secondary />
        <PinKey label="0" onClick={() => press("0")} />
        <PinKey label="Entrar" onClick={submit} primary />
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-cranberry/10 px-4 py-3 text-sm font-bold text-cranberry">
          {error}
        </p>
      )}

      <p className="mt-5 text-center text-xs text-pine/50">
        {PLAYERS.length} jugadores · regalo entre $20.000 y $50.000 · noche de
        Navidad
      </p>
    </motion.div>
  );
}

function PinKey({
  label,
  onClick,
  primary,
  secondary,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
  secondary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-2 py-3 text-base font-bold transition-transform active:scale-95 ${
        primary
          ? "border-cranberry bg-cranberry text-candle hover:bg-cranberry/90"
          : secondary
            ? "border-spruce/20 bg-spruce/10 text-pine/60"
            : "border-spruce/20 bg-white hover:border-gold"
      }`}
    >
      {label}
    </button>
  );
}
