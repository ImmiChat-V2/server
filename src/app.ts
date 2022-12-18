import express from 'express';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@/interfaces';
import { ErrorMiddleware } from '@/middlewares';
import Datasource from '@/databases';

class App {
  public readonly app: express.Application;
  public readonly env: string;
  public readonly port: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || '5000';
    this.env !== 'test' && this.initializeDataSource();
    this.initializeMiddlewares();
    this.intializeRoutes(routes);
    this.initializeSwagger();
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
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
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
    } catch (error) {
      console.error(error);
    }
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}

export default App;
