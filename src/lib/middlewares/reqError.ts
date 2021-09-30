import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
/**
 * This function returns an error handling express
 * middleware. That can be configured according to need
 * @returns an error handler middleware function
 */
export function reqError(): ErrorRequestHandler {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const httpStatusCode: number = error.httpStatusCode || 500;
    const message: string = error.message || 'Internal server error, please try again';

    return res.render('error', { errorMessage: message });
  };
}
