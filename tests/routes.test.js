const RedisClient = require('./../src/cacheDriver/RedisDriver');
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

