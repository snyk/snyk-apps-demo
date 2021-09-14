import type { Router } from 'express';

export interface Controller {
  path: string;
  router: Router;
}
