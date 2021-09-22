import {
  HomepageController,
  ExampleController,
  DefaultController,
  CallbackController,
  ProjectsController,
  SettingsController,
} from './lib/controllers';
import App from './app';
import { AdminController } from './lib/controllers/admin/adminController';
import config from 'config';
import { Config } from '../src/lib/types';

new App(
  [
    new AdminController(),
    new HomepageController(),
    new CallbackController(),
    new ProjectsController(),
    new SettingsController(),
    new ExampleController(),
    new DefaultController(),
  ],
  config.get(Config.Port),
);
