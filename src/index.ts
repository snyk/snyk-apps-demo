import {
  HomepageController,
  ExampleController,
  DefaultController,
  CallbackController,
} from './lib/controllers';
import App from './app';

new App(
  [
    new HomepageController(),
    new CallbackController(),
    new ExampleController(),
    new DefaultController(),
  ],
  3000,
);
