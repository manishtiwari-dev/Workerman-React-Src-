import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const NotifyAlert = (msg) => {
  toast.info(msg,  {position: toast.POSITION.BOTTOM_RIGHT});
  return null;
};

function Notify(status, msg) {
  if (status) toast.info(msg,   {position: toast.POSITION.BOTTOM_RIGHT});
  else toast.error(msg,   {position: toast.POSITION.BOTTOM_RIGHT});
  return null;
}
export default Notify;