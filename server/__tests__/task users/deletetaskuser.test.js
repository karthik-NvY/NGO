const request = require('supertest')

describe('deleting task users', () => {
    test("No task found", async () => {
        const packet = {id: ''};
        const res = await request("http://localhost:8080").post('/taskuser/delete_task').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("No task found with the provided ID");
    });

    test("Task user deleted successfully", async () => {
        const packet = {id: ''};
        const res = await request("http://localhost:8080").post('/taskuser/delete_task').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Task user deleted successfully");
    });
});