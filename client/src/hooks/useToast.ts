import { useState, useCallback } from 'react';
import { ToastData } from '@/components/ui/Toast';

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastId}`;
    const newToast: ToastData = {
      ...toast,
      id,
      duration: toast.duration || 4000
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ type: 'success', title, description, duration });
  }, [addToast]);

  const error = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ type: 'error', title, description, duration });
  }, [addToast]);

  const info = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ type: 'info', title, description, duration });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string, duration?: number) => {
    return addToast({ type: 'warning', title, description, duration });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    info,
    warning
  };
};
