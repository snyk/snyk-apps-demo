import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { getProjectsFromApi } from './projectsHandlers';

export class ProjectsController implements Controller {
  public path = '/projects';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.getProjects);
  }

  private async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await getProjectsFromApi();
      return res.render('projects', {
        projects,
      });
    } catch (error) {
      return next(error);
    }
  }
}
