export interface CodopsListResponse {
  codopList: Codop[];
  type:      string;
}

export interface Codop {
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
