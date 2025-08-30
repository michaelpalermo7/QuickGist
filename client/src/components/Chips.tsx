// Chips.tsx
import React from "react";
import { Check, CircleDollarSign, UserLock } from "lucide-react";

type Variant = "green" | "blue" | "orange";

const theme: Record<
  Variant,
  { bg: string; border: string; text: string; iconBg: string; icon: string }
> = {
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/30",
    text: "text-emerald-300",
    iconBg: "bg-emerald-400/20",
    icon: "text-emerald-300",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-400/30",
    text: "text-blue-300",
    iconBg: "bg-blue-400/20",
    icon: "text-blue-300",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-400/30",
    text: "text-orange-300",
    iconBg: "bg-orange-400/20",
    icon: "text-orange-300",
  },
};

type ChipProps = {
  label: string;
  icon?: React.ElementType;
  variant?: Variant;
  className?: string;
};

export function Chip({
  label,
  icon: Icon,
  variant = "green",
  className,
}: ChipProps) {
  const t = theme[variant];
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2",
        "backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]",
        "transition-colors",
        t.bg,
        t.border,
        t.text,
        className || "",
      ].join(" ")}
    >
      {Icon && (
        <span
          className={[
            "inline-flex h-6 w-6 items-center justify-center rounded-full",
            t.iconBg,
          ].join(" ")}
        >
          <Icon size={16} className={t.icon} strokeWidth={2.5} />
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-medium">{label}</span>
    </span>
  );
}

export default function ChipsRow() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Chip icon={Check} variant="green" label="Trusted by 500+ users" />
      <Chip icon={CircleDollarSign} variant="blue" label="100% Free to use" />
      <Chip icon={UserLock} variant="orange" label="Privacy Guaranteed" />
    </div>
  );
}
