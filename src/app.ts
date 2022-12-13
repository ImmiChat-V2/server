import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import ErrorMiddleware from '@middlewares/error.middleware';
import Datasource from '@databases';

class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || '5000';
    this.env !== 'test' && this.initializeDataSource();
    this.intializeRoutes(routes);
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on PORT ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
  }

  private intializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private async initializeDataSource() {
    try {
      await Datasource.initialize();
      console.log('initialized');
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
