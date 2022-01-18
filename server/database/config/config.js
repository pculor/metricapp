import 'dotenv/config';

export default {
  development: {
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    org: process.env.INFLUX_ORG,
    bucket: process.env.INFLUX_BUCKET,
  },
  test: {
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    org: process.env.INFLUX_ORG,
    bucket: process.env.INFLUX_BUCKET,
  },
  production: {
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    org: process.env.INFLUX_ORG,
    bucket: process.env.INFLUX_BUCKET,
  },
};
