/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import request from 'supertest';
import server from '../../api/server';

const baseUrl = '/api/v1';

describe('server', () => {
  it('[GET]/ a all metric in response', async () => {
    const res = await request(server)
      .get(`${baseUrl}/metrics`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('body');
    expect(res.body.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _field: 'value' }),
        expect.objectContaining({ result: '_result' }),
      ]),
    );
    expect(res.body.message).toEqual('Metric Retrieved Successful');
    expect(res.body.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
  });
});
