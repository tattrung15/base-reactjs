import { RouterProvider } from "react-router-dom";
import ModalContainer from "./components/modal/modal-container";
import ToastContainer from "./components/toast/toast.container";
import router from "./router";
import "./styles/app.scss";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div id="toast-root">
        <ToastContainer />
      </div>
      <div id="modal-root">
        <ModalContainer />
      </div>
    </>
  );
}

export default App;
