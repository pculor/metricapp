/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';

import Validations from '../middleware/Validations';
import MetricsController from '../controllers/MetricsController';

const router = Router();

router
  .route('/')
  .post(Validations.validateMetric, MetricsController.CreateMetric)
  .get(MetricsController.GetMetrics);

export default router;
