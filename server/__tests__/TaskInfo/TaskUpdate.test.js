const request = require('supertest')
id = '65f8e718a63c61ad6e1f9537';

describe('updating tasks', () => {

    test('Return error if task is not found with the given id', async () => {
        const newData = {title:"test2",description : "testing endpoints",no_volunteer: "5"};
        const packet = {id: "65f8e789a63c61ad6e1f9538", newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No task found with the provided ID');
    });

    test('updating task title if the given task exist', async () => {
        const newData = {title:"testing in progress"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });

    test('updating task description if the given task exist', async () => {
        const newData = {description : "testing endpoints of task"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });

    test('updating no of volunteers if the given task exist', async () => {
        const newData = {no_volunteer: "5"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });


    test('updating task details if the given task exist', async () => {
        const newData = {title:"tested",description : "testing update task",no_volunteer: "5"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });
 
});