import { type ToastContainerProps } from "./interfaces";
import Toast from "./Toast";

const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
  return (
    <div className="fixed bottom-2 left-2 z-50 min-w-52">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClick={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
