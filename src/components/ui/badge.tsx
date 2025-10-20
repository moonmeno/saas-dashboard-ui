import { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "muted";

const badgeClasses: Record<BadgeVariant, string> = {
  default:
    "bg-white/10 text-[var(--text)] border border-white/10",
  success: "bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/40",
  warning: "bg-[var(--warning)]/20 text-[var(--warning)] border border-[var(--warning)]/40",
  danger: "bg-[var(--danger)]/20 text-[var(--danger)] border border-[var(--danger)]/40",
  muted: "bg-white/5 text-[var(--muted)] border border-white/10",
};

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const Badge = ({ children, variant = "default", className }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
      badgeClasses[variant],
      className
    )}
  >
    {children}
  </span>
);

export default Badge;
