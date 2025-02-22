import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const dismissToast = React.useCallback((id) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  const createToast = React.useCallback((message, variant = 'success') => {
    setToasts((toasts) => [
      ...toasts,
      { id: crypto.randomUUID(), message, variant },
    ]);
  }, []);

  const value = React.useMemo(() => {
    return {
      toasts,
      createToast,
      dismissToast,
    };
  }, [createToast, dismissToast, toasts]);

  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.code === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
