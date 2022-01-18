/* eslint-disable import/no-unresolved */
import http from 'http';
// eslint-disable-next-line import/extensions
import app from './server/api/server';
import logger from './server/config/winston.config';

const port = process.env.PORT || 4000;

const httpServer = http.createServer(app);

httpServer.listen(port, () => logger.info(`Application started on http://localhost:${port}`));
