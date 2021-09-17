import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { readFromDb } from '../../utils/db';
import axios from 'axios';

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
      const data = await readFromDb();
      const access_token = data?.access_token; // We will use when everything works
      const token_type = data?.token_type;
      // Using personal token for rendering purposes
      const result = await axios({
        method: 'POST',
        url: `https://snyk.io/api/v1/org/${process.env.SNYK_ORG_PERSONAL}/projects`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${process.env.SNYK_API_TOKEN_PERSONAL}`,
        },
      });
      return res.render('projects', {
        loading: false,
        projects: result.data.projects,
      });
    } catch (error) {
      return next(error);
    }
  }
}
