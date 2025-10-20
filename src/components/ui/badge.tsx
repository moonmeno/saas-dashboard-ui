import { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "muted";

const badgeClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--surface-3)] text-[var(--text)] border border-[var(--outline)]",
  success: "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/30",
  warning: "bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/30",
  danger: "bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/30",
  muted: "bg-[var(--surface-3)] text-[var(--muted)] border border-[var(--outline)]",
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
