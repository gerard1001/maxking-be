export interface IResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface ICount {
  count: number;
}

export interface IToken {
  token: string;
  role?: string;
  id?: string;
}

export interface Choice {
  choice: string;
  index?: number;
}

export interface Issuer {
  name: string;
  signature: string;
  position: string;
}
