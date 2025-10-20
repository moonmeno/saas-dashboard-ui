import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type SwitchProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
  children?: ReactNode;
};

const Switch = ({ pressed, className, children, ...props }: SwitchProps) => (
  <button
    type="button"
    aria-pressed={pressed}
    className={cn(
      "relative inline-flex h-11 w-20 items-center rounded-full border border-white/10 bg-[var(--surface-2)] px-1 transition",
      pressed ? "bg-[var(--brand)]/30" : "bg-[var(--surface-2)]",
      className
    )}
    {...props}
  >
    <span className="sr-only">{children}</span>
    <span
      className={cn(
        "pointer-events-none inline-block h-9 w-9 rounded-full bg-white/90 shadow-md transition-transform",
        pressed ? "translate-x-9" : "translate-x-0"
      )}
    />
  </button>
);

export default Switch;
