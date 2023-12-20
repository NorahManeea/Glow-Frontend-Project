import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '../types/types';


export const showToast = (message: string, type: ToastType) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'info':
      toast.info(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};
