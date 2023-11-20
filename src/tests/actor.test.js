const request = require('supertest');
const app = require('../app');
require('../models');

let id;


test('GET /actors debe de traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});


test("POST /actors debe de crear un actor", async () => {
    const song = {
        firstName: "Jhon",
        lastName: "Doe",
        nationality: "Usa",
        image: "http://image.png",
        birthday: 1998
    }
    const res = await request(app).post('/actors').send(song);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(song.name);
});


test("PUT /actors/:id Debe actualizar un actor", async () => {
    const song={
        firstName: "Jhon Update"
    }
    const res = await request(app).put(`/actors/${id}`).send(song)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(song.name)
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});