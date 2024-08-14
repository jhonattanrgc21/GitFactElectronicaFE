export interface DataReceivers {
  result: any;
  isEmpty: boolean;
}

export interface Receiver {
  id: number;
  identificationTypeId: string;
  identificationTypeDescription: string;
  identification: string;
  name: string;
  phoneNumber: string;
  email: string;
  accountNumber: string;
  establishmentNumber: string;
}
