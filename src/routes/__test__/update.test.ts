import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { signup } from '../../test/setup';

it('returns a 404 if the provided id does not exist', async () => {
  const cookie = await signup();
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title: 'title 1',
      price: 20
    })
    .expect(404)
});

it('returns a 401 if the user is not authenticated', async () => {
  const cookie = await signup();
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'title 1',
      price: 20
    })
    .expect(401)
});

it('returns a 401 if the user does not own the ticket', async () => {
  const cookie = await signup();
  const cookie1 = await signup('test1@test.com');

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title 1',
      price: 20
    });


  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie1)
    .send({
      title: 'title 2',
      price: 20
    })
    .expect(401)

});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = await signup();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title 1',
      price: 20
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'title 2',
      price: -10
    })
    .expect(400)


});

it('updates the ticket provided valid inputs', async () => {
  const cookie = await signup();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title 1',
      price: 20
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'title 2',
      price: 120
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

  expect(ticketResponse.body.title).toEqual('title 2');
  expect(ticketResponse.body.price).toEqual(120)

});