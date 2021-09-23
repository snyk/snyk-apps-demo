import express from 'express';
import { reqError } from './lib/middlewares';
import * as path from 'path';
import { envCheck, Severity } from 'envar-check';
import * as fs from 'fs';
import { join } from 'path';
import type { Application } from 'express';
import type { Server } from 'http';
import type { Controller } from './lib/types';
import { Envars, Config } from './lib/types';
import config from 'config';
import passport from 'passport';
import expressSession from 'express-session';
import { getOAuth2 } from './lib/utils/OAuth2Strategy';
import { v4 as uuidv4 } from 'uuid';

export const API_BASE = config.get(Config.ApiBase);
export const APP_BASE = config.get(Config.AppBase);

class App {
  public app: Application;
  private server: Server;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
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
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set('views', path.join(__dirname, '/views'));
    this.app.set('view engine', 'ejs');
    this.app.use('/public', express.static(path.join(__dirname, '/public')));
    this.app.use(expressSession({ secret: uuidv4(), resave: false, saveUninitialized: true }));
    this.setupPassport();
  }

  private initErrorHandler() {
    // The function reqError itself returns an error handler
    // Should always be used at last
    this.app.use(reqError());
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

  private setupPassport() {
    const nonce = uuidv4();
    const state = uuidv4();

    passport.use(getOAuth2(nonce));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.serializeUser((user: any, done) => {
      done(null, user);
    });
    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });
  }
}

export let dbPath: string;
export default App;
