/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'dotenv/config';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import {
  success, OK, NOT_FOUND, customError,
} from 'request-response-handler';
import envConfigs from '../config/config';
import logger from '../../config/winston.config';

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

class InfluxModel {
  url = config.url;

  token = config.token;

  org = config.org;

  bucket = config.bucket;

  influxDB = new InfluxDB({ url: this.url, token: this.token });

  defaultTag = { dataSet: 'metric-app' };

  static async Insert(params) {
    const db = new InfluxModel();

    /**
         * Create a write client from the getWriteApi method.
         * Provide your `org` and `bucket`.
         * */
    const writeApi = db.influxDB.getWriteApi(db.org, db.bucket, 'ms');

    /**
         * Apply default tags to all points.
         * */
    writeApi.useDefaultTags(db.defaultTag);

    /**
         * Create a point and write it to the buffer.
         * */
    const { name } = params;
    const value = (params.value * 1).toFixed(2);
    const { timeStamp } = params;
    const record = new Point('metrics')
      .tag('name', name)
      .floatField('value', value)
      .timestamp(timeStamp);
    logger.info(`${record}`);

    writeApi.writePoint(record);
    /**
         * Flush pending writes and close writeApi.
         * */
    writeApi.close().then(() => {
      logger.info('WRITE FINISHED');
      // return record;
    }).catch((error) => {
      logger.error(`Something went wrong during write ${error}`);
      // return error
    });
    return record;
  }

  static async Select(req, res, next) {
    const db = new InfluxModel();
    const timeObj = {
      min: 'm',
      hour: 'h',
      day: 'd',
    };
    const start = req.query.start || '12';
    const interval = req.query.interval && timeObj[req.query.interval] || '';
    const avg = req.query.avg ? req.query.avg : 3;
    /**
         * Instantiate the InfluxDB client
         * with a configuration object.
         *
         * Get a query client configured for your org.
         * */
    const queryApi = db.influxDB.getQueryApi(db.org);

    const query = req.query.avg ? `from(bucket: "${db.bucket}") 
                        |> range(start: -${start}${interval})
                        |> movingAverage(n: ${avg})
                        `
      : `from(bucket: "${db.bucket}") 
                        |> range(start: -${start}${interval})
                        `;
    const tableRecords = [];
    const queryObserver = {
      next(row, tableMeta) {
        const record = tableMeta.toObject(row);
        logger.info(record);
        tableRecords.push(record);
      },
      error(error) {
        logger.info(error);
        logger.info('Finished ERROR');
        return next(
          customError({
            status: NOT_FOUND,
            message: `Metrics not found ${error}`,
          }),
        );
      },
      complete() {
        logger.info('Finished SUCCESS');
        return success(res, OK, 'Metric Retrieved Successful', tableRecords);
      },
    };
    queryApi.queryRows(query, queryObserver);
  }
}

export default InfluxModel;
