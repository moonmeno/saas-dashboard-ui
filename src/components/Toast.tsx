import { useEffect } from "react";
import { useAppStore } from "../lib/store";

// 토스트 타입(intent)에 따라 배경/텍스트 스타일을 지정합니다.
const intentStyles = {
  info: "bg-white/10",
  success: "bg-[var(--success)]/15 text-[var(--success)]",
  warning: "bg-[var(--warning)]/15 text-[var(--warning)]",
  danger: "bg-[var(--danger)]/15 text-[var(--danger)]",
};

const Toast = () => {
  const toasts = useAppStore((state) => state.toasts);
  const dismiss = useAppStore((state) => state.dismissToast);

  useEffect(() => {
    // 가장 최근 토스트 하나만 자동으로 닫히도록 타이머를 설정합니다.
    if (!toasts.length) return;
    const timer = setTimeout(() => {
      dismiss(toasts[0].id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts, dismiss]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-xl border border-white/10 px-4 py-3 text-sm font-medium ${
            intentStyles[toast.intent ?? "info"]
          }`}
          role="status"
        >
          <p className="text-[var(--text)]">{toast.title}</p>
          {toast.description ? (
            <p className="text-xs text-[var(--muted)]">{toast.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Toast;
