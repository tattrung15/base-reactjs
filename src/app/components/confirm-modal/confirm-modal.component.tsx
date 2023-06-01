import { PortalDialogProps } from "@app/services/modal.service";
import Modal from "../modal/modal.component";
import Button from "../button";

function ConfirmModal({ portalDialogRef, portalData }: PortalDialogProps) {
  return (
    <Modal onCancel={portalDialogRef.close} buttonCancelInChildren>
      <div className="w-[350px] h-auto p-5">
        <div className="text-lg pr-5">{portalData?.message}</div>
        <div className="mt-4 flex justify-center gap-3">
          <Button
            size="xs"
            label="Đồng ý"
            width="fit-content"
            className="px-6 text-sm"
            labelClassName="font-bold"
            onClick={() => portalDialogRef.close({ isAccept: true })}
          />
          <Button
            size="xs"
            label="Hủy bỏ"
            theme="danger"
            width="fit-content"
            className="px-6 text-sm"
            labelClassName="font-bold"
            onClick={() => portalDialogRef.close()}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
