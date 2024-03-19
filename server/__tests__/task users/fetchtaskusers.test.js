const request = require('supertest')

describe('fetching task users', () => {
    test('no users requested for the task', async () => {
        const packet = {task_id: ''};///////////////////////////////////////////////////////////////////////////////
        const res = await request("http://localhost:8080").post('/taskuser/fetch_task').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('No users requested for the task');
    });   
});