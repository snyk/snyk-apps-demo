import type { Controller, ProjectData, ProjectsResponse } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { getProjectsFromRestApi } from './projectsHandlers';

/**
 * The ProjectsController class for handling user projects
 * page fetched using the REST API GET projects endpoint and related requests.
 * implements the controller interface which
 * has two members the path and the router.
 */
export class ProjectsController implements Controller {
  // The base URL path for this controller
  public path = '/projects';
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
    this.router.get(`${this.path}`, this.getProjects);
  }

  /**
   * Gets the projects page from the Snyk REST API using the
   * app's access token and then renders the project list
   * @returns Projects page with a list of org projects
   * otherwise error via the next function for error
   * middleware to handle
   */
  private async getProjects(_req: Request, res: Response, next: NextFunction) {
    try {
      const projectsResponses = await getProjectsFromRestApi();
      const allProjects: ProjectData[] = [];

      projectsResponses.forEach((response: ProjectsResponse) => {
        allProjects.push(...response.projects);
      });

      return res.render('projects', {
        projects: allProjects,
      });
    } catch (error) {
      return next(error);
    }
  }
}
