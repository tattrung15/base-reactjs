import { RouterProvider } from "react-router-dom";
import ModalContainer from "./components/modal/modal-container";
import ToastContainer from "./components/toast/toast.container";
import router from "./router";
import "./styles/app.scss";
import Loading from "@core/components/loading";

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
      <div id="loading-root">
        <Loading />
      </div>
    </>
  );
}

export default App;
