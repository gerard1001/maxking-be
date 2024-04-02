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
}
