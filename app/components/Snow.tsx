"use client";

import { useEffect, useState } from "react";

export default function Snow({ count = 20 }: { count?: number }) {
  const [flakes, setFlakes] = useState<
    { left: number; size: number; dur: number; delay: number }[]
  >([]);

  useEffect(() => {
    setFlakes(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 6 + Math.random() * 8,
        dur: 8 + Math.random() * 8,
        delay: -Math.random() * 12,
      }))
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}
