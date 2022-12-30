import { GetNotificationResponse } from "@app/types";
import HttpService from "@core/services/http/http.service";

class _NotificationService {
  public getAllNotification() {
    return HttpService.get<GetNotificationResponse[]>("/notifications");
  }
}

const NotificationService = new _NotificationService();

export default NotificationService;
