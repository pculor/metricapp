/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import request from 'supertest';
import {
  OK, CREATED, SERVER_ERROR, BAD_REQUEST,
} from 'request-response-handler';
import server from '../api/server';
import mockData from './mocks/data';

const baseUrl = '/api/v1';

describe('MetricsController ', () => {
  it('[GET]/ a all metric in response', async () => {
    const res = await request(server)
      .get(`${baseUrl}/metrics`)
      .expect(OK)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('body');
    expect(res.body.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _field: 'value' }),
        expect.objectContaining({ result: '_result' }),
      ]),
    );
    expect(res.body.message).toEqual('Metric Retrieved Successful');
    expect(res.body.statusCode).toEqual(OK);
    expect(res.body.success).toEqual(true);
  });
});

// TODO EDGE CASES
describe('MetricsController should return an error', () => {
  it('[POST]/ should not create metric if value is a string', async () => {
    const res = await request(server)
      .post(`${baseUrl}/metrics`)
      .set('Content-Type', 'application/json')
      .send(mockData.wrongInputValue)
      .expect(BAD_REQUEST)
      .expect('Content-Type', /json/);
    expect(res.body.success).toEqual(false);
    expect(res.body.errors.message).toEqual('value must be a number');
    expect(res.status).toEqual(BAD_REQUEST);
  });

  it('[POST]/ should not create metric if name is a number', async () => {
    const res = await request(server)
      .post(`${baseUrl}/metrics`)
      .set('Content-Type', 'application/json')
      .send(mockData.wrongInputName)
      .expect(BAD_REQUEST)
      .expect('Content-Type', /json/);
    expect(res.body.success).toEqual(false);
    expect(res.body.errors.message).toEqual('name must be a string');
    expect(res.status).toEqual(BAD_REQUEST);
  });

  it('[POST]/ should return an error message if input is empty', async () => {
    const res = await request(server)
      .post(`${baseUrl}/metrics`)
      .set('Content-Type', 'application/json')
      .send(mockData.emptyInput)
      .expect(BAD_REQUEST)
      .expect('Content-Type', /json/);
    expect(res.body.success).toEqual(false);
    expect(res.body.errors.message).toEqual('name is not allowed to be empty');
    expect(res.status).toEqual(BAD_REQUEST);
  });
});
