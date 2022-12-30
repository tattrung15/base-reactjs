export interface GetNotificationResponse {
  _id: string;
  content: string;
  created_at: string;
  money: number;
  id_play: {
    _id: string;
    numbers: string[];
    win: string | null;
  };
  id_acc: {
    stn: number;
    stc: number;
    _id: string;
    username: string;
    phone: string;
    money: number;
    bank_number: string;
    bank_name: string;
    bank_own: string;
    bank_qr: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}
