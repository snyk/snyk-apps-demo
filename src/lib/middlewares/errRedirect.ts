import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to handle error redirects from the authentication process
 * as defined in the RFC: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
 * Based on various error code and messages return. App creators can take suitable actions
 * such a taking user back to the authentication flow
 * @returns redirect error handling middleware
 */
export function errRedirect(req: Request, res: Response, next: NextFunction): void {
  const { error, error_description } = req.query;
  return error ? next({ errCode: error, message: error_description }) : next();
}
