"use client";

import { useEffect, useState } from "react";
import { PLAYERS, loadAssignment } from "@/lib/game";
import LoginCard from "@/components/LoginCard";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadAssignment();
    const last = localStorage.getItem("asf_session");
    if (last) window.location.href = "/jugador";
    else setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-pine">
      {/* Snow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${(i * 37) % 100}%`,
              fontSize: `${6 + (i % 4) * 3}px`,
              animationDuration: `${9 + (i % 5) * 4}s`,
              animationDelay: `${-(i % 9)}s`,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center gap-12 px-8 py-12 md:px-16 lg:flex-row lg:gap-20">
        {/* Title side */}
        <div className="max-w-md text-center lg:text-left">
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <LogoMark />
            <span className="font-display text-lg font-semibold tracking-tight text-gold">
              Navidad 2026
            </span>
          </div>
          <h1 className="font-display mt-6 text-5xl font-extrabold leading-[1.1] tracking-tighter text-candle md:text-6xl lg:text-7xl">
            Navidad donde los <em className="text-gold">Tapia</em> Rivera{" "}
            <span className="text-gold">2026</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sage">
            Siete personas, siete regalos, un solo secreto. Ingresa tu nombre y
            tu clave de 4 dígitos para descubrir a quién te tocó.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {PLAYERS.map((p) => (
              <Bauble key={p.name} name={p.name} />
            ))}
          </div>
        </div>

        {/* Login card */}
        <LoginCard />
      </div>
    </main>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <circle
        cx="12"
        cy="14"
        r="8"
        fill="none"
        stroke="#E3B04B"
        strokeWidth="2"
      />
      <rect x="10.5" y="2" width="3" height="4" fill="#E3B04B" />
      <path
        d="M4 12 Q12 17 20 12"
        fill="none"
        stroke="#E3B04B"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Bauble({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      title={name}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-spruce font-display text-sm font-semibold text-gold"
    >
      {initials}
    </div>
  );
}
