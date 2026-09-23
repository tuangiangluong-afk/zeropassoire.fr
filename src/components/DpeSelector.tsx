"use client";
import { useState } from "react";
import { Info } from "lucide-react";

interface ClassInfo {
  code: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  color: string;
  label?: string;
  selectable: boolean;
}

const CLASSES: ClassInfo[] = [
  { code: "A", color: "#0e7a3c", selectable: false },
  { code: "B", color: "#3ba55d", selectable: false },
  { code: "C", color: "#a8cf45", selectable: false },
  { code: "D", color: "#f4d93c", selectable: false },
  { code: "E", color: "#f5a623", label: "Interdit 2034", selectable: true },
  { code: "F", color: "#ef6c35", label: "Interdit 2028", selectable: true },
  { code: "G", color: "#c9252d", label: "Interdit location", selectable: true },
];

export type DpeClass = "E" | "F" | "G";

export default function DpeSelector({
  value,
  onChange,
}: {
  value: DpeClass | null;
  onChange: (v: DpeClass) => void;
}) {
  const [clickedInactive, setClickedInactive] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {CLASSES.map((c) => {
          const active = value === c.code;
          const darkText = c.code === "A" || c.code === "B" || c.code === "G" || c.code === "D";
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                if (c.selectable) {
                  setClickedInactive(null);
                  onChange(c.code as DpeClass);
                } else {
                  setClickedInactive(c.code);
                }
              }}
              className={[
                "flex flex-col items-center justify-center rounded-xl py-4 px-1 transition",
                c.selectable ? "cursor-pointer hover:scale-105" : "opacity-35 hover:opacity-60 cursor-pointer",
                active ? "ring-4 ring-stone-900 scale-105 shadow-md" : "",
              ].join(" ")}
              style={{ backgroundColor: c.color, color: darkText ? "white" : "#1c1917" }}
              title={c.selectable ? `Classe ${c.code}` : `Classe ${c.code} non soumise aux interdictions de location`}
            >
              <span className="font-display text-2xl font-bold">{c.code}</span>
              {c.selectable && (
                <span className="text-[10px] font-medium leading-tight mt-1 opacity-95 text-center">
                  {c.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {clickedInactive && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
          <Info size={16} className="shrink-0 mt-0.5 text-emerald-700" />
          <span>
            Excellente nouvelle : la classe <strong>{clickedInactive}</strong> n'est pas qualifiée de passoire thermique et n'est soumise à aucune interdiction légale de location. Notre simulateur se concentre sur les logements <strong>E, F et G</strong> qui subissent les échéances de la loi Climat &amp; Résilience.
          </span>
        </div>
      )}
    </div>
  );
}
