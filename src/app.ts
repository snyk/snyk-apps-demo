import express from 'express';
import { reqError } from './lib/middlewares';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { envCheck, Severity } from 'envar-check';
import * as fs from 'fs';
import { join } from 'path';
import type { Application } from 'express';
import type { Server } from 'http';
import type { Controller } from './lib/types';
import { Envars } from './lib/types';

export const API_BASE = 'https://snyk.io/api';
export const APP_BASE = 'https://snyk.io';

class App {
  public app: Application;
  private server: Server;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.initDotEnv();
    this.checkEnvVars();
    this.initDatabaseFile();
    this.initGlobalMiddlewares();
    this.initRoutes(controllers);
    this.initErrorHandler();
    // Start the server
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
    this.app.set('views', path.join(__dirname, '/views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.static(path.join(__dirname, '/public')));
  }

  private initErrorHandler() {
    // The function reqError itself returns an error handler
    // Should always be used at last
    this.app.use(reqError());
  }
  // Initial dotenv to load the environmental variables
  private initDotEnv() {
    dotenv.config({ path: path.join(__dirname, '../.env') });
  }

  private checkEnvVars() {
    envCheck(
      [Envars.ClientId, Envars.ClientSecret, Envars.RedirectUri, Envars.Scopes, Envars.EncryptionSecret],
      Severity.FATAL,
    );
  }

  private initDatabaseFile() {
    try {
      const dbFolder = join(__dirname, '../db');
      dbPath = join(dbFolder, 'db.json');
      console.log('Using db: ' + dbPath);

      if (!fs.existsSync(dbPath)) {
        if (!fs.existsSync(dbFolder)) {
          fs.mkdirSync(dbFolder);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export let dbPath: string;
export default App;
