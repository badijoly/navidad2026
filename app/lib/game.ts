export const PLAYERS = [
  { name: "Gabriel", pass: "8758" },
  { name: "Verónica", pass: "6754" },
  { name: "Marlenne", pass: "2032" },
  { name: "Rodolfo", pass: "4266" },
  { name: "Constanza", pass: "8144" },
  { name: "Donovan", pass: "3750" },
  { name: "Esteban", pass: "3765" },
] as const;

export type Player = { name: string; pass: string };

export function findPlayer(name: string, pass: string): Player | null {
  const n = name.trim().toLowerCase();
  return (
    PLAYERS.find(
      (p) => p.name.toLowerCase() === n && p.pass === pass
    ) ?? null
  );
}

export const ASSIGNMENT_KEY = "asf_assignacion_v1";

/** Random single-cycle derangement: each person gives to exactly one
 * other, receives from exactly one other, nobody gets themselves. */
export function makeCycle(n: number): number[] {
  // result[i] = index of who person i gives to
  for (let attempt = 0; attempt < 500; attempt++) {
    const perm = Array.from({ length: n }, (_, i) => i);
    // Fisher-Yates
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    if (isSingleCycle(perm)) return perm;
  }
  // deterministic fallback rotation is a valid single cycle
  return Array.from({ length: n }, (_, i) => (i + 1) % n);
}

function isSingleCycle(p: number[]): boolean {
  if (p.some((v, i) => v === i)) return false;
  const seen = new Array(p.length).fill(false);
  let count = 0;
  let idx = 0;
  while (!seen[idx]) {
    seen[idx] = true;
    count++;
    idx = p[idx];
  }
  return count === p.length;
}

export function loadAssignment(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ASSIGNMENT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  const map: Record<string, string> = {};
  const cycle = makeCycle(PLAYERS.length);
  PLAYERS.forEach((p, i) => {
    map[p.name] = PLAYERS[cycle[i]].name;
  });
  try {
    localStorage.setItem(ASSIGNMENT_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
  return map;
}

export function getAssignment(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ASSIGNMENT_KEY);
    if (raw) return JSON.parse(raw) as Record<string, string>;
  } catch {
    /* ignore */
  }
  return null;
}

/* --- per-player local storage helpers --- */

const key = (ns: string, name: string) => `asf_${ns}_${name.toLowerCase()}`;

export function loadList(ns: string, name: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key(ns, name));
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    /* ignore */
  }
  return [];
}

export function saveList(ns: string, name: string, items: string[]) {
  try {
    localStorage.setItem(key(ns, name), JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export type Question = { to: string; text: string; ts: number };

const Q_KEY = "asf_preguntas_v1";

export function loadQuestions(): Question[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(Q_KEY);
    if (raw) return JSON.parse(raw) as Question[];
  } catch {
    /* ignore */
  }
  return [];
}

export function saveQuestions(qs: Question[]) {
  try {
    localStorage.setItem(Q_KEY, JSON.stringify(qs));
  } catch {
    /* ignore */
  }
}
