import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-white/10 bg-[var(--surface-2)] px-4 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:border-[var(--brand)]",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
