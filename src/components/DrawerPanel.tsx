import { ReactNode } from "react";
import Button from "./ui/button";

export type DrawerPanelProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  actions?: ReactNode;
  children: ReactNode;
};

const DrawerPanel = ({ open, title, description, onClose, actions, children }: DrawerPanelProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[var(--surface)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 id="drawer-title" className="text-lg font-semibold text-[var(--text)]">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
            ) : null}
          </div>
          <Button variant="ghost" className="h-10" onClick={onClose} aria-label="Close panel">
            Close
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {actions ? <div className="border-t border-white/10 p-6">{actions}</div> : null}
      </aside>
    </div>
  );
};

export default DrawerPanel;
