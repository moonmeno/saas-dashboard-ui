import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-full border border-[var(--outline)] bg-[var(--surface-2)] px-4 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
