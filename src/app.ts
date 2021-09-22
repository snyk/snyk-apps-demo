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
import { Envars, Config } from './lib/types';
import config from 'config';
import passport from 'passport';
import expressSession from 'express-session';
import { getOAuth2 } from './lib/utils/OAuth2Strategy';

export const API_BASE = config.get(Config.ApiBase);
export const APP_BASE = config.get(Config.AppBase);

class App {
  public app: Application;
  private server: Server;

  constructor(controllers: Controller[], port: number) {
    this.initDotEnv();
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
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(expressSession({ secret: 'test', resave: false, saveUninitialized: true }));
    this.setupPassport();
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

  private setupPassport() {
    const clientID = process.env[Envars.ClientId] as string;
    const clientSecret = process.env[Envars.ClientSecret] as string;
    const callbackURL = process.env[Envars.RedirectUri] as string;
    const scope = process.env[Envars.Scopes] as string;

    passport.use(
      getOAuth2({
        authorizationURL: 'http://localhost:8000/apps/oauth2/authorize',
        tokenURL: 'http://localhost:3846/oauth2/token',
        clientID,
        clientSecret,
        callbackURL,
        scope,
        state: 'test',
        nonce: 'test',
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.serializeUser((user, done) => {
      console.log('User: ', user);
      done(null, user);
    });
    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });
  }
}

export let dbPath: string;
export default App;
