"use client";

import { useRef } from "react";
import { Download } from "@phosphor-icons/react";

/** Draws a cranberry + gold keepsake card to a canvas and downloads it as PNG. */
export default function SaveImageButton({
  playerName,
  friend,
}: {
  playerName: string;
  friend: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Background: cranberry velvet
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#8d1a2c");
    grad.addColorStop(1, "#5e0f1c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Gold border
    ctx.strokeStyle = "#E3B04B";
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, w - 48, h - 48);
    ctx.lineWidth = 2;
    ctx.strokeRect(38, 38, w - 76, h - 76);

    ctx.textAlign = "center";

    // Eyebrow
    ctx.fillStyle = "#F0D9D5";
    ctx.font = "700 20px Nunito, sans-serif";
    ctx.fillText("AMIGO SECRETO FAMILIAR", w / 2, 130);

    // Snowflake ornaments
    ctx.fillStyle = "rgba(227,176,75,0.7)";
    ctx.font = "28px sans-serif";
    ctx.fillText("❄", w / 2 - 160, 130);
    ctx.fillText("❄", w / 2 + 160, 130);

    // Label
    ctx.fillStyle = "#E3B04B";
    ctx.font = "700 22px Nunito, sans-serif";
    ctx.fillText("T U   A M I G O   S E C R E T O   E S", w / 2, 240);

    // Friend name
    ctx.fillStyle = "#F6EFE0";
    ctx.font = "600 84px Fraunces, serif";
    ctx.fillText(friend, w / 2, 350);

    // Divider
    ctx.strokeStyle = "#E3B04B";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 140, 400);
    ctx.lineTo(w / 2 + 140, 400);
    ctx.stroke();

    // Rules
    ctx.fillStyle = "#F0D9D5";
    ctx.font = "600 22px Nunito, sans-serif";
    const rules = [
      "Regalo entre $20.000 y $50.000",
      "Guarda el secreto a toda costa",
      "Listo para la noche de Navidad",
    ];
    rules.forEach((r, i) => ctx.fillText(r, w / 2, 460 + i * 44));

    // Signature
    ctx.fillStyle = "rgba(246,239,224,0.55)";
    ctx.font = "400 18px Nunito, sans-serif";
    ctx.fillText(
      `Guardado por ${playerName} · No lo muestres a nadie`,
      w / 2,
      h - 70
    );
  };

  const save = () => {
    const w = 800;
    const h = 640;
    const canvas = document.createElement("canvas");
    canvas.width = w * 2;
    canvas.height = h * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(2, 2);
    draw(ctx, w, h);
    canvasRef.current = canvas;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `amigo-secreto-${playerName.toLowerCase()}.png`;
    a.click();
  };

  return (
    <div className="w-full">
      <p className="gold-label text-[11px]">No lo olvides</p>
      <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-candle">
        Guarda tu recuerdo
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-sage">
        Descarga una tarjeta con el nombre de tu amigo secreto y las reglas
        del juego. Solo para ti.
      </p>

      {/* PNG preview in cranberry + gold */}
      <div className="mx-auto mt-6 max-w-sm rounded-2xl border-2 border-gold bg-gradient-to-b from-[#8d1a2c] to-[#5e0f1c] p-8 text-center shadow-xl">
        <p className="text-[11px] font-bold tracking-[0.2em] text-rose">
          AMIGO SECRETO FAMILIAR
        </p>
        <p className="mt-6 text-[11px] font-bold tracking-[0.2em] text-gold">
          TU AMIGO SECRETO ES
        </p>
        <p className="font-display mt-2 text-4xl font-semibold text-candle">
          {friend}
        </p>
        <div className="mx-auto mt-6 h-px w-32 bg-gold" />
        <p className="mt-6 text-sm font-semibold leading-relaxed text-rose">
          Regalo entre $20.000 y $50.000
          <br />
          Guarda el secreto a toda costa
          <br />
          Listo para la noche de Navidad
        </p>
      </div>

      <button
        onClick={save}
        className="mt-8 flex items-center gap-2 rounded-full border-2 border-gold bg-gold px-8 py-4 font-display text-lg font-semibold text-pine transition-transform hover:scale-[1.02]"
      >
        <Download size={20} weight="bold" />
        Guardar como imagen
      </button>
    </div>
  );
}
