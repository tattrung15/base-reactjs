import { GetNotificationResponse } from "@app/types";

export interface NotificationState {
  notifications: GetNotificationResponse[];
  notificationsLoading: boolean;
  notificationsError: boolean;
}

export enum NotificationActionType {
  STORE_NOTIFICATIONS = "notifications/storeNotifications",
  CLEAR_NOTIFICATIONS = "notifications/clearNotifications",
  FETCH_NOTIFICATIONS_FAILED = "notifications/fetchNotificationsFailed",
}

export enum NotificationEpicType {
  FETCH_NOTIFICATIONS = "notifications/fetchNotifications",
}
