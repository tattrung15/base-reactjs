import { GetNotificationResponse } from "@app/types";
import { AppAction } from "@core/types/redux.type";
import { NotificationActionType } from "./notification.type";

export const storeNotifications = (
  notifications: GetNotificationResponse[]
): AppAction => {
  return {
    type: NotificationActionType.STORE_NOTIFICATIONS,
    payload: { notifications },
  };
};

export const clearNotifications = (): AppAction => {
  return {
    type: NotificationActionType.CLEAR_NOTIFICATIONS,
  };
};
