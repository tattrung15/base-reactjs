import { removeIconThin } from "@assets/images";
import useOnClickOutside from "@core/hooks/use-on-click-outside.hook";
import { useRef } from "react";
import { ModalProps } from "./modal.type";

function ModalDialogTemplate({ props }: { props: ModalProps }) {
  const {
    children,
    buttonCancelInChildren = true,
    buttonCancelInScreen = false,
    onCancel,
  } = props;

  const handleCancel = () => {
    onCancel();
  };

  const contentRef = useRef(null);

  useOnClickOutside(contentRef, () => {
    onCancel();
  });

  return (
    <div
      className="fixed top-0 left-0 z-[90] w-full h-full flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="relative z-[80] bg-white text" ref={contentRef}>
        {children}

        {buttonCancelInChildren && (
          <div
            className="absolute top-[-60px] right-0 cursor-pointer text-white text-6xl"
            onClick={handleCancel}
          >
            <img
              src={removeIconThin.default}
              alt="remove icon"
              height={16}
              width={16}
            />
          </div>
        )}
      </div>

      {buttonCancelInScreen && (
        <div
          className="absolute top-2 right-2 cursor-pointer text-white"
          onClick={handleCancel}
        >
          <img
            src={removeIconThin.default}
            alt="remove icon"
            height={16}
            width={16}
          />
        </div>
      )}
    </div>
  );
}

export default ModalDialogTemplate;
