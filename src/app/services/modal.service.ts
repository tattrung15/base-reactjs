import {
  PortalDialogAll,
  PortalDialogRef,
} from "@app/components/modal/modal.type";
import { ExtractPropsFromComponent } from "@app/types/helper";
import { ComponentType } from "react";
import { Subject } from "rxjs";

enum ActionType {
  Portal,
  Close,
}

export interface ModalData<Options = PortalDialogAll> {
  type: ActionType;
  options?: Options;
  modalId: number;
}

export interface PortalDialogProps<PortalData = any> {
  portalDialogRef: PortalDialogRef;
  portalData?: PortalData;
}

type ExtractPortalDataFromPortalDialogProps<P> = P extends PortalDialogProps<
  infer PortalData
>
  ? PortalData
  : P;

export type ExtractPortalDataFromComponent<T = any> = T extends (
  props: infer P
) => any
  ? ExtractPortalDataFromPortalDialogProps<P>
  : ExtractPortalDataFromPortalDialogProps<ExtractPropsFromComponent<T>>;

const subject = new Subject<ModalData>();

class ModalService {
  private static genId = 1;

  private modalId = 0;

  public openPortalDialog<T = ComponentType>(
    Component: T,
    portalData?: ExtractPortalDataFromComponent<T>
  ): PortalDialogRef {
    this.modalId = ModalService.genId++;
    const portalDialogObs: Subject<any>[] = [];

    const portalDialogRef = {
      close: (data: any) => {
        this.close();
        portalDialogObs.forEach((ob) => {
          ob.next(data);
        });
      },
      afterClosed: () => {
        const ob = new Subject();

        portalDialogObs.push(ob);

        return ob;
      },
    };

    const allOptions: PortalDialogAll = {
      portalDialogRef,
      content: Component,
      portalData,
    };

    subject.next({
      type: ActionType.Portal,
      options: allOptions,
      modalId: this.modalId,
    });

    return portalDialogRef;
  }

  public close() {
    subject.next({ type: ActionType.Close, modalId: this.modalId });
  }

  public getModal() {
    return subject.asObservable();
  }
}

function openPortalDialog<T = ComponentType>(
  Component: T,
  portalData?: ExtractPortalDataFromComponent<T>
): PortalDialogRef {
  return new ModalService().openPortalDialog(Component, portalData);
}

export { ActionType, ModalService, openPortalDialog };
