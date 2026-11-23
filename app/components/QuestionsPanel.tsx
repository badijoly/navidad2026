"use client";

import { useEffect, useState } from "react";
import { EnvelopeOpen, PaperPlane, Question as QuestionIcon } from "@phosphor-icons/react";
import {
  loadQuestions,
  saveQuestions,
  getAssignment,
  type Question,
} from "@/lib/game";

export default function QuestionsPanel({ player }: { player: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [draft, setDraft] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [assignment, setAssignment] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    setQuestions(loadQuestions());
    setAssignment(getAssignment());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveQuestions(questions);
  }, [questions, hydrated]);

  const myFriend = assignment ? assignment[player] : null;

  const received = questions.filter((q) => q.to === player);
  const sent = questions.filter((q) => !q.to);

  const send = () => {
    const t = draft.trim();
    if (!t || !myFriend) return;
    setQuestions((prev) => [
      ...prev,
      { to: myFriend, text: t, ts: Date.now() },
    ]);
    setDraft("");
  };

  const removeSent = (ts: number) =>
    setQuestions((prev) => prev.filter((q) => q.ts !== ts));

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-3">
        <EnvelopeOpen size={26} className="text-gold" />
        <div>
          <p className="gold-label text-[11px]">Buzón anónimo</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-candle">
            Preguntas anónimas
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-rose">
        Envíale preguntas anónimas a tu amigo secreto para afinar el regalo.
        Tú nunca verás quién te escribió a ti.
      </p>

      {/* Envelope slot + compose */}
      <div className="mt-6 rounded-xl border border-gold/30 bg-pine/50 p-6">
        <div className="flex items-center gap-2 text-sm font-bold text-gold">
          <QuestionIcon size={16} />
          Pregunta para {myFriend ?? "tu amigo secreto"}
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Ej: ¿Qué te falta en la cocina?"
          className="mt-3 w-full rounded-lg border-2 border-gold/30 bg-pine px-4 py-3 text-base text-candle outline-none placeholder:text-sage/50 focus:border-gold"
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          className="mt-3 flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-bold text-pine transition-opacity disabled:opacity-40"
        >
          <PaperPlane size={16} weight="fill" />
          Enviar anónimo
        </button>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="gold-label text-[10px]">
            Recibidas ({received.length})
          </h3>
          <div className="mt-3 space-y-3">
            {received.length === 0 && (
              <p className="text-sm italic text-sage/70">
                Nadie te ha escrito todavía.
              </p>
            )}
            {received.map((q) => (
              <Slip key={q.ts} text={q.text} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="gold-label text-[10px]">
            Enviadas por ti ({sent.length})
          </h3>
          <div className="mt-3 space-y-3">
            {sent.length === 0 && (
              <p className="text-sm italic text-sage/70">
                Aún no envías ninguna pregunta.
              </p>
            )}
            {sent.map((q) => (
              <div
                key={q.ts}
                className="group relative rounded border border-gold/25 bg-pine/40 p-4"
              >
                <p className="pr-8 text-sm leading-relaxed text-candle">
                  “{q.text}”
                </p>
                <button
                  onClick={() => removeSent(q.ts)}
                  aria-label="Quitar pregunta"
                  className="absolute right-3 top-3 text-xs font-bold text-sage hover:text-cranberry"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Unsigned paper slip for received anonymous notes */
function Slip({ text }: { text: string }) {
  return (
    <div className="rotate-[0.5deg] rounded border-l-4 border-gold bg-candle p-4 text-pine shadow-md">
      <p className="text-sm leading-relaxed font-semibold">“{text}”</p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-pine/40">
        Sin firma
      </p>
    </div>
  );
}
