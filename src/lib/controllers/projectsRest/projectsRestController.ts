import type { Controller, ProjectData, ProjectsResponse } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { getProjectsFromRestApi } from './projectsRestHandlers';

/**
 * The ProjectsRestController class for handling user projects
 * page and related requests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class ProjectsRestController implements Controller {
  // The base URL path for this controller
  public path = '/projects-rest';
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
    this.router.get(`${this.path}`, this.getProjectsRest);
  }

  /**
   * Gets the projects page from the Snyk REST API using the
   * user access token and then renders the project list
   * @returns Projects page with list of user project
   * otherwise error via next function for error
   * middleware to handle
   */
  private async getProjectsRest(_req: Request, res: Response, next: NextFunction) {
    try {
      const projectsResponses = await getProjectsFromRestApi();
      const allProjects: ProjectData[] = [];

      projectsResponses.forEach((response: ProjectsResponse) => {
        allProjects.push(...response.projects);
      });

      return res.render('projects-rest', {
        projects: allProjects,
      });
    } catch (error) {
      return next(error);
    }
  }
}
