import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgresDB';

describe('Todo route testing', () => {

  beforeAll(async() => {
    await testServer.start()
  });

  beforeEach( async() => {
    await prisma.todo.deleteMany();
  })

  afterAll( () => {
    testServer.close();
  });
  
  const todo1 = { text: 'Hello world 1'};
  const todo2 = { text: 'Hello world 2'};

  test('Should return TODOS api/todos', async() => {

    await prisma.todo.createMany({
      data: [todo1, todo2]
    });

    const { body } = await request(testServer.app)
      .get('/api/todos')
      expect(200);

    expect( body ).toBeInstanceOf( Array );
    expect( body.length ).toBe(2);
    expect( body[0].text ).toBe(todo1.text);
    expect( body[1].text ).toBe(todo2.text);
    
  });

  test('Should return TODO api/todo/:id', async() => {

    const todo = await prisma.todo.create({
      data: todo1
    });

    const { body } = await request(testServer.app)
    .get(`/api/todos/${todo.id}`)
    expect(200);

    expect(body).toEqual({
      id: todo.id, 
      text: todo.text, 
      completedAt: todo.completedAt 
    });

  });

  test('Should return a 404 not found api/todos/:id', async() => {
    const { body } = await request(testServer.app)
    .get(`/api/todos/999`)
    expect(400);

    expect(body).toEqual({ error: 'Todo with id 999 not found' })
    
  });
  
  test('Should return a new Todo (POST) api/todos', async() => {
    const { body } = await request(testServer.app)
    .post(`/api/todos`)
    .send(todo1)
    expect(201);

    expect( body ).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
    
  });

  test('Should return an error if property text is present but without value api/todos', async() => {
    const { body } = await request(testServer.app)
    .post(`/api/todos`)
    .send({text: ''})
    expect(400);

    expect(body).toEqual({ error: expect.any(String) })

  });

  test('Should return an error if property text is empty api/todos', async() => {
    const { body } = await request(testServer.app)
    .post(`/api/todos`)
    .send({})
    expect(400);

    expect(body).toEqual({ error: expect.any(String) })

  });

  test('Should return an updated TODO api/todos/:id', async() => {

    const todo = await prisma.todo.create({ data: todo1 });
    
    const { body } = await request(testServer.app)
    .put(`/api/todos/${todo.id}`)
    .send({text: 'Hello world updated', completedAt: '2023-11-10'})
    expect(200);

    expect( body ).toEqual({
      id: expect.any(Number),
      text: 'Hello world updated',
      completedAt: '2023-11-10T00:00:00.000Z'
    });

  });

  test('Should return an 404 if Todo not found', async() => {
    const { body } = await request(testServer.app)
    .put(`/api/todos/999`)
    .send({text: 'Hello world updated', completedAt: '2023-11-10'})
    expect(400);

    expect(body).toEqual({ error: 'Todo with id 999 not found' })

  });

  test('Should return an updated Todo only the date', async() => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
    .put(`/api/todos/${todo.id}`)
    .send({completedAt: '2024-11-10'})
    expect(200);
    
    expect( body ).toEqual({
      id: expect.any(Number),
      text: todo.text,
      completedAt: '2024-11-10T00:00:00.000Z'
    });

  });

  test('Should a delete Todo', async() => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
    .delete(`/api/todos/${todo.id}`)
    .expect(200);
    
    expect(body).toEqual({ 
      id: expect.any(Number), 
      text: todo.text, 
      completedAt: null 
    });

  });

  test('Should return 404 if todo do not exist ', async() => {

    const { body } = await request(testServer.app)
    .delete(`/api/todos/999`)
    .expect(404);
    
    expect(body).toEqual({ error: expect.any(String) });
  });

});
