import { toast } from "react-toastify";

const useToastNotify = () => {
    const notify = (message) => toast.success(message, { autoClose: 1500 });

    const createNotification = (notification)=>{
        notify(notification)
    }
    return {
        createNotification
    }
}

export default useToastNotify
