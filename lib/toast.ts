import { toast, ToastOptions } from 'react-toastify';

export enum ToastType {
    success,
    error,
    info,
    warning,
    default,
}

export function showToast(
    message: string,
    type: ToastType = ToastType.default,
) {
    const options: ToastOptions = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    switch (type) {
        case ToastType.success:
            toast.success(message, options);
            break;
        case ToastType.error:
            toast.error(message, options);
            break;
        case ToastType.info:
            toast.info(message, options);
            break;
        case ToastType.warning:
            toast.warning(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
}
