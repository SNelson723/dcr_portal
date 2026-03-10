import type { ReactNode } from "react";
import type { ToastAnimationType, ToastType } from "../types";

/**
 * Levels of abstraction for Toasts
 * 1. ToastProvider: The context provider that wraps the application.
 * 2. ToastContextValue: The context value that provides methods to add/remove toasts.
 * 3. ToastContainer: The component that renders the list of toasts.
 * 4. ToastProps: The individual toast object structure.
 * 5. ToastOptions: Configuration options for each toast.
 */

// For providing the context
export interface ToastProviderProps {
  children: ReactNode;
  autoClose?: boolean;
  duration?: number;
}

// Toast Configuration
export interface ToastOptions {
  useIcon?: boolean;
  autoClose?: boolean;
  duration?: number;
  animationType?: ToastAnimationType;
}

// Toast Object => uses the ToastOptions
export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

export interface ToastContextValue {
  addToast: (type: ToastType, message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}


export interface ToastContainerProps {
  toasts: ToastProps[]; // Array of toasts to display
  removeToast: (id: string) => void; // Function to remove a toast by id
}
