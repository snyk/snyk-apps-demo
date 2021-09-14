import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
/**
 * @returns an error handler middleware function
 */
export function reqError(): ErrorRequestHandler {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    const httpStatusCode: number = error.httpStatusCode || 500;
    const message: string =
      error.message || 'Internal server error, please try again';

    return res.status(httpStatusCode).send(message);
  };
}
