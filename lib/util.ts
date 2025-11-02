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

// Example usage in your app:
/*
import { showToast } from '@/utils/toast';

// Success toast
showToast.success('Profile updated successfully!');

// Error toast
showToast.error('Failed to save changes');

// Warning toast
showToast.warning('Please fill in all required fields');

// Info toast
showToast.info('New updates available');

// Loading toast
const loadingToast = showToast.loading('Uploading file...');
// Later you can dismiss it:
showToast.dismiss(loadingToast);

// Promise toast
showToast.promise(
  fetchUserData(),
  {
    loading: 'Fetching user data...',
    success: (data) => `Welcome back, ${data.name}!`,
    error: (err) => `Error: ${err.message}`
  }
);

// Custom toast
showToast.custom('Custom message', {
  icon: <MyCustomIcon />,
  duration: 5000,
  position: 'top-center'
});
*/
