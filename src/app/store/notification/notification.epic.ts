import { combineEpics, ofType } from "redux-observable";
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";
import { AppAction } from "@core/types/redux.type";
import {
  NotificationActionType,
  NotificationEpicType,
} from "./notification.type";
import { storeNotifications } from "./notification.action";
import NotificationService from "@app/services/http/notification.service";

export const fetchNotifications = (extras: {
  destroy$: Subject<void>;
}): AppAction => {
  return {
    type: NotificationEpicType.FETCH_NOTIFICATIONS,
    payload: { extras },
  };
};

const fetchAndStoreNotificationsEpic = (
  action$: Observable<AppAction>
): Observable<AppAction> => {
  return action$.pipe(
    ofType(NotificationEpicType.FETCH_NOTIFICATIONS),
    switchMap((action: AppAction) =>
      NotificationService.getAllNotification().pipe(
        map((response) => storeNotifications(response)),
        catchError(() =>
          of({
            type: NotificationActionType.FETCH_NOTIFICATIONS_FAILED,
          })
        ),
        takeUntil(action.payload?.extras.destroy$)
      )
    )
  );
};

const notificationEpic = combineEpics(fetchAndStoreNotificationsEpic);

export default notificationEpic;
