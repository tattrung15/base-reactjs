import ModalDialogTemplate from "./modal.template";
import { ModalProps } from "./modal.type";

function Modal(props: ModalProps) {
  return (
    <>
      <ModalDialogTemplate props={props} />
    </>
  );
}

export default Modal;
