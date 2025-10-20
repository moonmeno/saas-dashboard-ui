import { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ className, children, ...props }: SelectProps) => (
  <select
    className={cn(
      "h-11 rounded-full border border-[var(--outline)] bg-[var(--surface-2)] px-4 text-sm text-[var(--text)] focus-visible:border-[var(--brand)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40",
      className
    )}
    {...props}
  >
    {children}
  </select>
);

export default Select;
