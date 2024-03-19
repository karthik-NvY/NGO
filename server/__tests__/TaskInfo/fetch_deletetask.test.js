const request = require('supertest')

describe('fetch tasks', () => {

    test('Return error if given id is not a task id', async () => {
        const packet = {id:"45f90e7e26fa81bc305470dc"};
        const res = await request("http://localhost:8080").post('/task/fetchInfo').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No Task Information was found');
    });

    test('Return error if title is missing', async () => {

        const packet = {id:"65f8e718a63c61ad6e1f9537"};
        const res = await request("http://localhost:8080").post('/task/fetchInfo').send(packet)
        expect(res.status).toBe(200);
    });

 
});

describe('deleting tasks', () => {

    test('Return error if given id is not a task id', async () => {
        const packet = {id:"45f90e7e26fa81bc305470dc"};
        const res = await request("http://localhost:8080").post('/task/deleteInfo').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No task found with the provided ID');
    });

    test('Return error if title is missing', async () => {
        //the id shpuld be changed before testing again
        const packet = {id:"65f912fd7ef96f0ca8979fa3"};
        const res = await request("http://localhost:8080").post('/task/deleteInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task deleted successfully');
    });

 
});
