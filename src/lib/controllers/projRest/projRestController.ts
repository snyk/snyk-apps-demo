import type { Controller, ProjectData } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { getProjRestFromApi } from './projRestHandlers';

/**
 * The ProjRestController class for handling user projects
 * page and related requests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class ProjRestController implements Controller {
  // The base URL path for this controller
  public path = '/projRest';
  // Express router for this controller
  public router = Router();

  /**
   * The constructor is used to initialize the
   * routes for this controller
   */
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    // The route to render all user projects lists
    this.router.get(`${this.path}`, this.getProjRest);
  }

  /**
   * Gets the projects page from the Snyk API using the
   * user access token and then renders the project list
   * @returns Projects page with list of user project
   * otherwise error via next function for error
   * middleware to handle
   */
  private async getProjRest(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await getProjRestFromApi();
      const allProjects: ProjectData[] = [];
      projects.forEach((data: any) => {
        allProjects.push(...data.projects);
      });

      return res.render('projectsRest', {
        projects: allProjects,
      });
    } catch (error) {
      return next(error);
    }
  }
}
