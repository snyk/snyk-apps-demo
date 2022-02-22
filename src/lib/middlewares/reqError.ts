import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
/**
 * This function returns an error handling express
 * middleware. That can be configured according to need
 * @returns an error handler middleware function
 */
export function reqError(): ErrorRequestHandler {
  // @types/express explicitly types this as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const message: string = error.message || 'Internal server error, please try again';
    const errorCode = error.errCode;
    return res.render('error', { errorMessage: message, errorCode });
  };
}
