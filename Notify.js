import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const NotifyAlert = (msg) => {
  toast.warn(msg,  {position: toast.POSITION.TOP_RIGHT});
  return null;
};

function Notify(status, msg) {
  if (status) toast.success(msg,   {position: toast.POSITION.TOP_RIGHT});
  else toast.error(msg,   {position: toast.POSITION.TOP_RIGHT});
  return null;
}
export default Notify;