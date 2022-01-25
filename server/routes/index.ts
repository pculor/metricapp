/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import metricRoute from './metricRoutes';

const router = Router();

router.use('/metrics', metricRoute);

export default router;
