"use client";
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
  { code: "E", color: "#f5a623", label: "Écarts à améliorer", selectable: true },
  { code: "F", color: "#ef6c35", label: "Passoire", selectable: true },
  { code: "G", color: "#c9252d", label: "Déperditoire", selectable: true },
];

export type DpeClass = "E" | "F" | "G";

export default function DpeSelector({
  value,
  onChange,
}: {
  value: DpeClass | null;
  onChange: (v: DpeClass) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {CLASSES.map((c) => {
        const active = value === c.code;
        const darkText = c.code === "A" || c.code === "B" || c.code === "G" || c.code === "D";
        return (
          <button
            key={c.code}
            type="button"
            disabled={!c.selectable}
            onClick={() => c.selectable && onChange(c.code as DpeClass)}
            className={[
              "flex flex-col items-center justify-center rounded-xl py-4 px-1 transition",
              c.selectable ? "cursor-pointer hover:scale-105" : "opacity-30 cursor-not-allowed",
              active ? "ring-4 ring-stone-900 scale-105" : "",
            ].join(" ")}
            style={{ backgroundColor: c.color, color: darkText ? "white" : "black" }}
          >
            <span className="font-display text-2xl font-bold">{c.code}</span>
            {c.selectable && (
              <span className="text-[10px] leading-tight mt-1 opacity-90">{c.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
