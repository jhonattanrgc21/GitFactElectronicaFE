export interface CreateReceiver{
  identificationTypeId: string;
  identification: string;
  name: string;
  phoneNumber: string;
  email: string;
  accountNumber?: string;
  establishmentNumber?: string;
}
