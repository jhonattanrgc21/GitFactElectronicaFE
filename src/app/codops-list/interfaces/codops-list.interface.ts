export interface CodopsListResponse {
  codopList: CodopList[];
  type:      string;
}

export interface CodopList {
  serviceCodeId: number;
  code:          string;
  iva:           number;
  serviceCode:   string;
  isIva:         number;
  description:   string;
  codopId:       number;
  type:          string;
  serviceName:   string;
  isActive:      number;
  operator:      string;
}
