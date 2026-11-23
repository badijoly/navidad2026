"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function RevealBox({
  playerName,
  friend,
  revealed,
  onReveal,
}: {
  playerName: string;
  friend: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setShowName(true), 900);
      return () => clearTimeout(t);
    }
  }, [revealed]);

  if (!revealed) {
    return (
      <div className="py-6">
        <p className="mx-auto max-w-md text-base leading-relaxed text-rose">
          Hola {playerName}, el sorteo ya está hecho y guardado para siempre.
          Cuando estés listo, abre tu regalo para ver a tu amigo secreto.
          <strong className="mt-2 block text-candle">
            Guárdalo en secreto: nadie más debe verlo.
          </strong>
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onReveal}
          className="mt-8 rounded-full border-2 border-gold bg-gold px-10 py-4 font-display text-lg font-semibold text-pine shadow-[0_0_40px_rgba(227,176,75,0.35)]"
        >
          Abrir mi regalo secreto
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4">
      {/* Gift box */}
      <div className="relative h-36 w-44">
        {/* Lid */}
        <div
          className={`reveal-lid absolute left-0 top-0 z-10 h-10 w-44 rounded-md border-2 border-gold/60 bg-[#5e0f1c] ${
            showName ? "reveal-lid" : "opacity-0"
          }`}
          style={showName ? {} : { animation: "none" }}
        >
          <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-gold/70" />
        </div>
        {/* Box body */}
        <div className="absolute bottom-0 h-28 w-44 overflow-hidden rounded-b-md rounded-t-sm border-2 border-gold/40 bg-gradient-to-b from-[#8d1a2c] to-[#5e0f1c]">
          <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gold/40" />
        </div>
        {/* Ribbon bow */}
        {!showName && (
          <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 text-2xl">
            🎀
          </div>
        )}
      </div>

      {showName && (
        <>
          <div className="reveal-name mt-8 rounded-xl border-2 border-gold bg-pine px-10 py-6 shadow-[0_0_50px_rgba(227,176,75,0.4)]">
            <p className="gold-label text-[10px]">Tu amigo secreto es</p>
            <p className="font-display mt-2 text-5xl font-semibold tracking-tight text-gold md:text-6xl">
              {friend}
            </p>
          </div>
          <ConfettiMini />
        </>
      )}
    </div>
  );
}

function ConfettiMini() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -140 - (i % 4) * 40],
            x: [(i % 2 ? 1 : -1) * (20 + i * 8)],
            scale: 1,
          }}
          transition={{ duration: 1.6, delay: 0.1 * (i % 6), ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 text-gold"
          style={{ fontSize: `${10 + (i % 3) * 4}px` }}
        >
          ❄
        </motion.span>
      ))}
    </div>
  );
}
