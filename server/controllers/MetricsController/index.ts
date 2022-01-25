/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'dotenv/config';
import {
  success, OK, CREATED, customError, SERVER_ERROR, BAD_REQUEST,
} from 'request-response-handler';
import logger from '../../config/winston.config';

import InfluxModel from '../../database/model';

/**
 * Handles metrics
 *
 * @class metrics
 */
class MetricsController {
  /**
   * Create Metrics
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {*}
   * @memberof MetricsController
   */
  static async CreateMetric(req, res, next) {
    try {
      const { name, value } = req.payload;
      const timeStamp = Date.now();
      // TODO create Metric
      const addMetric = await InfluxModel.Insert({ name, value, timeStamp });
      logger.info(addMetric);
      if (addMetric) {
        return success(res, CREATED, 'Metric Created Successful', addMetric);
      }
      return next(
        customError({
          status: BAD_REQUEST,
          message: 'Something went wrong',
        }),
      );
    } catch (error) {
      return next(
        customError({
          status: SERVER_ERROR,
          message: `Try again something went wrong ${error}`,
        }),
      );
    }
  }

  /**
   * Get Metrics
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {*}
   * @memberof MetricsController
   */
  static async GetMetrics(req, res, next) {
    try {
      const timeObj = {
        min: 'm',
        hour: 'h',
        day: 'd',
      };
      const start = req.query.start || '12';
      const interval = (req.query.interval && timeObj[req.query.interval]) || '';
      const avg = req.query.avg ? req.query.avg : 3;
      // TODO query Metric
      const result = await InfluxModel.Select({ start, interval, avg });
      return success(res, OK, 'Metric Retrieved Successful', result);
    } catch (error) {
      return next(
        customError({
          status: SERVER_ERROR,
          message: `Try again something went wrong ${error}`,
        }),
      );
    }
  }
}

export default MetricsController;
