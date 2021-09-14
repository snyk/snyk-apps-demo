import express from 'express';
import { reqError } from './lib/middlewares';
import type { Application, Request, Response } from 'express';
import type { Server } from 'http';
import type { Controller } from './lib/types';

class App {
  public app: Application;
  private server: Server;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.initRoutes(controllers);
    this.initGlobalMiddlewares();
    this.initErrorHandler();
    this.server = this.listen(port);
  }

  private initRoutes(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }

  private listen(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
    return this.server;
  }

  private initGlobalMiddlewares() {
    this.app.use(express.json());
  }

  private initErrorHandler() {
    // The function reqError itself returns an error handler
    // Should always be used at last
    this.app.use(reqError());
  }
}

export default App;
