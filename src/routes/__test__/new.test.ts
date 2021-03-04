import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/setup'

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
});

it('returns a status other than 401 if the user is signed in', async () => {
  const cookie = await signup();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({})

  expect(response.status).not.toEqual(404)
});

it('returns an error if an invalid title is provided', async () => {
  const cookie = await signup();
  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 10
    })
    .expect(400);

});

it('returns an error if an invalid price is provided', async () => {
  const cookie = await signup();
  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: ''
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'test',
      price: -10
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  await request(app)
    .post('/api/tickets')
    .send({
      title: 'test',
      price: 20
    })
    .expect(201)
})