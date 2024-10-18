export interface ServiceCodeResponse {
  data: ServiceCode[];
  type: string;
}

export interface ServiceCode {
  serviceCodeId: number;
  serviceCode:   string;
  serviceName:   string;
}
