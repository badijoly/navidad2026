"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAssignment, PLAYERS } from "@/lib/game";
import RevealBox from "@/components/RevealBox";
import RulesPanel from "@/components/RulesPanel";
import IdeasPanel from "@/components/IdeasPanel";
import QuestionsPanel from "@/components/QuestionsPanel";
import SaveImageButton from "@/components/SaveImageButton";
import Snow from "@/components/Snow";

export default function Jugador() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<Record<string, string> | null>(
    null
  );
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("asf_session");
    if (!session) {
      router.replace("/");
      return;
    }
    if (!PLAYERS.some((p) => p.name === session)) {
      localStorage.removeItem("asf_session");
      router.replace("/");
      return;
    }
    setName(session);
    setAssignment(getAssignment());
    setChecked(
      localStorage.getItem(`asf_compromiso_${session.toLowerCase()}`) === "1"
    );
  }, [router]);

  if (!name || !assignment) return null;

  const friend = assignment[name];

  return (
    <main className="relative min-h-[100dvh] bg-pine pb-4 text-candle">
      <Snow />

      {/* Header strip */}
      <header className="relative border-b border-gold/30 bg-spruce/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-lg font-semibold tracking-tight">
              Navidad 2026
            </span>
          </div>
          <div className="text-right">
            <p className="gold-label text-[10px]">Bienvenido</p>
            <p className="font-display text-xl font-semibold text-gold">
              {name}
            </p>
          </div>
        </div>
      </header>

      {/* Reveal region */}
      <section className="relative border-b border-gold/30 bg-cranberry px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="gold-label text-[11px] !text-rose">
            Tu asignación secreta
          </p>
          <RevealBox
            key={revealed ? "1" : "0"}
            playerName={name}
            friend={friend}
            revealed={revealed}
            onReveal={() => setRevealed(true)}
          />
        </div>
      </section>

      {/* Rules panel */}
      <section className="relative border-b border-gold/30 bg-spruce px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <RulesPanel
            checked={checked}
            onCheck={(v) => {
              setChecked(v);
              localStorage.setItem(
                `asf_compromiso_${name.toLowerCase()}`,
                v ? "1" : "0"
              );
            }}
          />
        </div>
      </section>

      {/* Ideas notebook */}
      <section className="relative border-b border-gold/30 bg-pine px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <IdeasPanel player={name} />
        </div>
      </section>

      {/* Questions mailbox */}
      <section className="relative border-b border-gold/30 bg-spruce px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <QuestionsPanel player={name} />
        </div>
      </section>

      {/* Save strip */}
      <section className="relative px-6 py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <SaveImageButton playerName={name} friend={friend} />
          <button
            onClick={() => {
              localStorage.removeItem("asf_session");
              router.push("/");
            }}
            className="text-sm font-bold text-sage underline hover:text-candle"
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="14" r="8" fill="none" stroke="#E3B04B" strokeWidth="2" />
      <rect x="10.5" y="2" width="3" height="4" fill="#E3B04B" />
      <path d="M4 12 Q12 17 20 12" fill="none" stroke="#E3B04B" strokeWidth="1.5" />
    </svg>
  );
}
