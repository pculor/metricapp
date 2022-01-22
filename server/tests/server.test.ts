/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  OK, CREATED, SERVER_ERROR, BAD_REQUEST, NOT_FOUND,
} from 'request-response-handler';
import server from '../api/server';

describe('server', () => {
  it('[GET]/ 200 response if valid endpoints works', async () => {
    const res = await request(server)
      .get('/')
      .expect(OK)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('body');
    expect(res.body.body).toEqual({
      metric_url: {
        root: '/api/v1/',
      },
    });
    expect(res.body.message).toEqual('Welcome to API root');
    expect(res.body.statusCode).toEqual(OK);
    expect(res.body.success).toEqual(true);
  });
  it('[GET]/ 404 Fail for invalid routes', () => request(server).get('/wrong').expect(NOT_FOUND));
});
