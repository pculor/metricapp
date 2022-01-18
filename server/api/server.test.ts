/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import request from 'supertest';
import server from './server';

describe('server', () => {
  it('[GET]/ 200 response if valid endpoints works', async () => {
    const res = await request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('body');
    expect(res.body.body).toEqual({
      metric_url: {
        root: '/api/v1/',
      },
    });
    expect(res.body.message).toEqual('Welcome to API root');
    expect(res.body.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
  });
  it('[GET]/ 404 Fail for invalid routes', () => request(server).get('/wrong').expect(404));
});
