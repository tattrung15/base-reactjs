import { AppAction } from "@core/types/redux.type";
import {
  NotificationActionType,
  NotificationEpicType,
  NotificationState,
} from "./notification.type";

export default function notificationReducer(
  state = initialState,
  action: AppAction
): NotificationState {
  switch (action.type) {
    case NotificationEpicType.FETCH_NOTIFICATIONS:
      return {
        ...state,
        notificationsLoading: true,
        notificationsError: false,
      };
    case NotificationActionType.STORE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload?.notifications,
        notificationsLoading: false,
        notificationsError: false,
      };
    case NotificationActionType.CLEAR_NOTIFICATIONS:
      return {
        ...initialState,
        notificationsLoading: false,
      };
    case NotificationActionType.FETCH_NOTIFICATIONS_FAILED:
      return {
        ...state,
        notificationsLoading: false,
        notificationsError: true,
      };
    default:
      return state;
  }
}

const initialState: NotificationState = {
  notifications: [],
  notificationsLoading: true,
  notificationsError: false,
};
