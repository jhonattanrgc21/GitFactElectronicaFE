import { CreateReceiver } from "./create-receiver.interface";

export type UpdateReceiver = Partial<CreateReceiver> & {
  receiverId: number;
}
