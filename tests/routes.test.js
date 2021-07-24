const RedisClient = require('../src/drivers/redisDriver');
const supertest = require('supertest');
const app = require('./../src/server');


describe('Article Api route', () => {

  beforeAll(() => {
    RedisClient.client.flushdb();
  });

  it('Response code should be 404 on non existent route', async () => {
    const response = await supertest(app).get('/api/article/random-business-article');
    expect(response.status).toBe(404);
  });

  it('Uppercase route should return error', async () => {
    const response = await supertest(app).get('/api/article/Random-Business-article');
    expect(response.status).toBe(400);
  });

  it('Snake case url should return error', async () => {
    const response = await supertest(app).get('/api/article/Random_Business-article');
    expect(response.status).toBe(400);
  });

  it('Existing article should return 200 with xml response', async () => {
    const response = await supertest(app).get('/api/article/business');
    expect(response.status).toBe(200);
    expect(response.type).toEqual('text/xml');
  });


  it('Articles: Should return error on non existent route', async () => {
    const response = await supertest(app).get('/api/article/asdasdqwe');
    expect(response.status).toBe(404);
  });

  afterAll(() => {
    RedisClient.close();
  });

});

