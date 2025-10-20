import { ReactNode } from "react";
import { cn } from "../lib/cn";

export type KpiCardProps = {
  label: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
  intent?: "default" | "success" | "warning" | "danger";
};

const intentRing: Record<NonNullable<KpiCardProps["intent"]>, string> = {
  default: "border-white/10",
  success: "border-[var(--success)]/50",
  warning: "border-[var(--warning)]/50",
  danger: "border-[var(--danger)]/50",
};

const KpiCard = ({ label, value, delta, icon, intent = "default" }: KpiCardProps) => {
  return (
    <article
      className={cn(
        "card-surface relative flex min-h-[140px] flex-col justify-between overflow-hidden p-6",
        intentRing[intent]
      )}
      aria-label={label}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{value}</p>
        </div>
        {icon ? <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-[var(--brand)]">{icon}</div> : null}
      </div>
      {delta ? (
        <p className="mt-4 text-xs font-medium text-[var(--muted)]">
          {delta}
        </p>
      ) : null}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />
    </article>
  );
};

export default KpiCard;
