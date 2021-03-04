import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';


let mongo: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  //delete existing collections
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})


//if decide to change from global , can just export function
//and import it where needed

export const signup = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201)

  //cookie does not get included in subsequent responses, so we will save it

  const cookie = response.get('Set-Cookie');

  return cookie
  // to use:
  //const cookie = await signup()
}