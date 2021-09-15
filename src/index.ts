import {
  HomepageController,
  ExampleController,
  DefaultController,
} from './lib/controllers';
import App from './app';

new App(
  [new HomepageController(), new ExampleController(), new DefaultController()],
  3000,
);
