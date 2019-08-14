export class Status {
  timestamp: Date;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
}

export class ResponseSchema<T> {
  status: Status;
  data: T;
}
