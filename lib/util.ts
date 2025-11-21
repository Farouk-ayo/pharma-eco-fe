import { toast } from "sonner";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: "top-right",
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      ...defaultOptions,
      ...options,
      style: { background: "#28a745", color: "white" },
    });
  },

  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...defaultOptions,
      ...options,
      style: { background: "#ff5722", color: "white" },
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      ...defaultOptions,
      ...options,
      style: { background: "#F59E0B", color: "white" },
    });
  },

  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      ...defaultOptions,
      ...options,
      style: { background: "#1e88e5", color: "white" },
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...defaultOptions,
      ...options,
    });
  },

  promise: async <T>(
    promise: Promise<T>,
    {
      loading = "Loading...",
      success = "Success!",
      error = "Something went wrong",
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: Error) => string);
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
      ...defaultOptions,
      ...options,
    });
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },

  custom: (
    message: string | React.ReactNode,
    options?: ToastOptions & { icon?: React.ReactNode }
  ) => {
    toast(message, {
      ...defaultOptions,
      ...options,
    });
  },
};

export function formatDateToString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
