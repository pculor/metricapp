/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { success, errorHandler, OK } from 'request-response-handler';
import morganMiddleware from '../config/morgan.config';
import logger from '../config/winston.config';
import router from '../routes';

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

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  success(res, OK, 'Welcome to API root', {
    metric_url: {
      root: '/api/v1/',
    },
  });
});

// All other GET requests not handled before will serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // TODO serve client
  app.use(express.static(path.resolve(__dirname, '../../../client/build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../../client/build', 'index.html'));
  });
}

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid route!',
  });
});

app.use(errorHandler());

export default app;
