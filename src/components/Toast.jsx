import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notificações">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'success'}`}>
          {toast.type === 'info' ? (
            <Info size={20} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
          ) : (
            <CheckCircle2 size={20} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
          )}
          <span className="toast-message">{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            style={{ marginLeft: 'auto', color: 'var(--color-muted)', padding: '2px' }}
            aria-label="Fechar notificação"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
