/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'dotenv/config';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import envConfigs from '../config/config';
import logger from '../../config/winston.config';
import { Imetric, Iquery } from '../../interfaces/metrics';

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

class InfluxModel {
  url = config.url;

  token = config.token;

  org = config.org;

  bucket = config.bucket;

  influxDB = new InfluxDB({ url: this.url, token: this.token });

  defaultTag = { dataSet: 'metric-app' };

  static async Insert(params: Imetric) {
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
    const { name, timeStamp } = params;
    const value = (params.value * 1).toFixed(2);
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

  static async Select(params: Iquery) {
    const db = new InfluxModel();
    const { start, interval, avg } = params;

    const selectQuery = new Promise((resolve, reject) => {
      const queryApi = db.influxDB.getQueryApi(db.org);

      const query = avg ? `from(bucket: "${db.bucket}") 
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
          tableRecords.push(record);
        },
        error(error) {
          logger.info(error);
          logger.info('Finished ERROR');
          reject(error);
        },
        complete() {
          logger.info('Finished SUCCESS');
          resolve(tableRecords);
        },
      };
      queryApi.queryRows(query, queryObserver);
    });
    /**
         * Instantiate the InfluxDB client
         * with a configuration object.
         *
         * Get a query client configured for your org.
         * */
    return selectQuery;
  }
}

export default InfluxModel;
