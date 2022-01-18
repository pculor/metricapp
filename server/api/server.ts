import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { success, errorHandler, OK } from 'request-response-handler';
// eslint-disable-next-line import/no-unresolved
import morganMiddleware from '../config/morgan.config';
// eslint-disable-next-line import/no-unresolved
import logger from '../config/winston.config';

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use(morganMiddleware);

app.use(helmet());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.error(
    `${err.message || 500} - ${err.message} -
        ${req.originalUrl} -
        ${req.method} - ${req.ip}`,
  );

  res.status(err.status || 500);
  res.render('error');
  next();
});

app.get('/', (req: Request, res: Response) => {
  success(res, OK, 'Welcome to API root', {
    metric_url: {
      root: '/api/v1/',
    },
  });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid route!',
  });
});

app.use(errorHandler());

export default app;
