import { toast } from "react-toastify";

export function DefaultNotification(
  text = "Bu bildiri boş bırakılmıştır!",
  duration = 750
) {
  toast(text, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
export function InfoNotification(
  text = "Bu bildiri boş bırakılmıştır!",
  duration = 750
) {
  toast.info(text, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
export function SuccessNotification(
  text = "Bu bildiri boş bırakılmıştır!",
  duration = 750
) {
  toast.success(text, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
export function WarnNotification(
  text = "Bu bildiri boş bırakılmıştır!",
  duration = 750
) {
  toast.warn(text, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
export function ErrorNotification(
  text = "Bu bildiri boş bırakılmıştır!",
  duration = 750
) {
  toast.error(text, {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
