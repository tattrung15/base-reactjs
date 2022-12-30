import { Observable } from "rxjs";

export interface PortalDialogRef {
  close: (data?: any) => void;
  afterClosed: () => Observable<any>;
}

export interface PortalDialogAll {
  portalDialogRef: PortalDialogRef;
  content: any;
  portalData?: any;
}

export interface ModalProps {
  children: JSX.Element;
  onCancel: () => void;
  buttonCancelInChildren?: boolean;
  buttonCancelInScreen?: boolean;
}
