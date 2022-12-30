import {
  ActionType,
  ModalData,
  ModalService,
  PortalDialogProps,
} from "@app/services/modal.service";
import React from "react";
import { Subscription } from "rxjs";
import { PortalDialogAll } from "./modal.type";

interface ModalListItem {
  id: number;
  modal: any;
}

class ModalContainer extends React.Component {
  state = {
    currentModalId: 0,
  };

  modalList: ModalListItem[] = [];

  private modalService = new ModalService();

  private subscription = new Subscription();

  componentDidMount() {
    const openModalSub = this.modalService
      .getModal()
      .subscribe((data: ModalData<any>) => {
        if (!data) {
          return;
        }

        const { type } = data;

        if (!this[type]) {
          return;
        }

        this[type](data);
      });

    this.subscription.add(openModalSub);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  componentDidUpdate() {
    if (this.modalList.length) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  render() {
    return (
      <>
        {this.modalList.map((item) => (
          <div id={`modal-${item.id}`} key={item.id}>
            {item.modal}
          </div>
        ))}
      </>
    );
  }

  private [ActionType.Portal] = (data: ModalData<PortalDialogAll>) => {
    const { modalId } = data;

    const PortalDialogComponent = data?.options?.content;

    const portalDialogProps: PortalDialogProps = {
      portalDialogRef: data?.options!.portalDialogRef,
      portalData: data?.options?.portalData,
    };

    this.modalList = [
      ...this.modalList,
      { id: modalId, modal: <PortalDialogComponent {...portalDialogProps} /> },
    ];

    this.setState({
      currentModalId: modalId,
    });
  };

  private [ActionType.Close] = (data: ModalData) => {
    const { modalId } = data;

    const closedModalId = modalId || this.state.currentModalId;

    const updateModalList = this.modalList.filter(
      (item) => item.id !== closedModalId
    );

    this.modalList = updateModalList;
    this.setState({
      currentModalId: updateModalList[updateModalList.length - 1]?.id,
    });
  };
}

export default ModalContainer;
