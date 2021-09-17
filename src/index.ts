import {
  HomepageController,
  ExampleController,
  DefaultController,
  CallbackController,
  ProjectsController,
  SettingsController,
} from './lib/controllers';
import App from './app';

new App(
  [
    new HomepageController(),
    new CallbackController(),
    new ProjectsController(),
    new SettingsController(),
    new ExampleController(),
    new DefaultController(),
  ],
  3000,
);
