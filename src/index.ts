import { ExampleController, DefaultController } from './lib/controllers';
import App from './app';

new App([new ExampleController(), new DefaultController()], 3000);
