const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const Users = require('./jokes/jokes-users-model')
// Write your tests here
test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {

  beforeAll( async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  })
  
  describe('[POST] /register', () => {
    it('creates new user and returns user data', async () => {
     await request(server).post('/api/auth/register').send({ 
        username: "Captain Marvel", 
        password: "foobar"
      })
      expect(await Users.find()).toHaveLength(1)
    })

    it('sends error message if username is taken', async () => {
      const res = await request(server).post('/api/auth/register').send({ 
        username: "Captain Marvel"
      })
      expect(res.body).toMatchObject({message: /'username taken'/i})
    })
  })

})