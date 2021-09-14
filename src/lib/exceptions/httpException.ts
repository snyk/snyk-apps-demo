export class HttpException extends Error {
  httpStatusCode: number;
  message: string;

  constructor(httpStatusCode: number, message: string) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.message = message;
  }
}
