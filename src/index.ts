import {
  IndexController,
  ExampleController,
  DefaultController,
  CallbackController,
  ProjectsController,
  SettingsController,
  AuthController,
  AdminController,
} from './lib/controllers';
import App from './app';
import config from 'config';
import { Config } from '../src/lib/types';
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * The package dotenv is used to load all your environmental
 * variables from the specified file path.
 */
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Creates a new app instance
 * @param {Controller[]} controllers Array of controllers used by different routes
 * @param {Number} port Port for the app to listen to. The config package is used to
 * load the port based on the NODE_ENV that is set. It uses the default.json file
 * in the config directry by default
 */
new App(
  [
    new AdminController(),
    new IndexController(),
    new CallbackController(),
    new AuthController(),
    new ProjectsController(),
    new SettingsController(),
    new ExampleController(),
    new DefaultController(),
  ],
  config.get(Config.Port),
);
