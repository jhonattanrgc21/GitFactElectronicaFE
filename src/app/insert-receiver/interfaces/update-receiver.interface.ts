import { CreateReceiver } from "./create-receiver.interface";

export type UpdateReceiver = Partial<CreateReceiver> & {
  id: number;
}
