import { SocketEvent } from "@app/constants";
import { Environment } from "@environments/environment";
import { Observable } from "rxjs";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

class _SocketService {
  private socket!: Socket;

  public connect(options?: Partial<ManagerOptions & SocketOptions>) {
    const socketUrl = Environment.SOCKET_URL as string;

    const newOptions: Partial<ManagerOptions & SocketOptions> = {
      ...options,
    };

    if (!newOptions.transports || !newOptions.transports.length) {
      newOptions.transports = ["polling"];
    }

    if (!this.socket) {
      this.socket = io(socketUrl, newOptions);
    }
  }

  public onQuick45sCountDown(): Observable<number> {
    return new Observable((observer) => {
      if (!this.socket) return;

      this.socket.on(SocketEvent.MESSAGE_45S, (data) => observer.next(data));
    });
  }

  public onQuick60sCountDown(): Observable<number> {
    return new Observable((observer) => {
      if (!this.socket) return;

      this.socket.on(SocketEvent.MESSAGE_60S, (data) => observer.next(data));
    });
  }

  public onQuick75sCountDown(): Observable<number> {
    return new Observable((observer) => {
      if (!this.socket) return;

      this.socket.on(SocketEvent.MESSAGE_75S, (data) => observer.next(data));
    });
  }
}

const SocketService = new _SocketService();

export default SocketService;
