
const supertest = require('supertest');
const app = require('./../src/server');

jest.setTimeout(10000);

describe('When application has started', () => {

  it('landing returns success', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  it('non existent route returns 404', async () => {
    const response = await supertest(app).get('/not-found');
    expect(response.status).toBe(404);
  });

});
