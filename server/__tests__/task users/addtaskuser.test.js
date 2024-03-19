const request = require('supertest')

describe('adding task users', () => {
    test('user already requested for a task', async () => {
        const packet = {task_id: '', user_id: ''};///////////////////////////////////////////////////////////////////////////////
        const res = await request("http://localhost:8080").post('/taskuser/add_task').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("user already requested for the task");
    });

    test('new entry by user for the task', async () => {
        const packet = {task_id: '', user_id: ''};///////////////////////////////////////////////////////////////////////////////
        const res = await request("http://localhost:8080").post('/taskuser/add_task').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.error).toBe("User availability successfully added");
    });
});