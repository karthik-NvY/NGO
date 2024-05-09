const request = require('supertest')
id = '65f8e718a63c61ad6e1f9537';

describe('updating tasks', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
        token = newloginres.body.token
    });
    test('Return error if token is not set properly', async () => {
        // No token.
        const res = await request("http://localhost:8080").post('/task/updateInfo')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });
    test('Return error if task is not found with the given id', async () => {
        const newData = {title:"test2",description : "testing endpoints",no_volunteer: "5"};
        const packet = {id: "65f8e789a63c61ad6e1f9538", newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('No task found with the provided ID');
    });

    test('updating task title if the given task exist', async () => {
        const newData = {title:"testing in progress"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });

    test('updating task description if the given task exist', async () => {
        const newData = {description : "testing endpoints of task"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });

    test('updating no of volunteers if the given task exist', async () => {
        const newData = {no_volunteer: "5"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });


    test('updating task details if the given task exist', async () => {
        const newData = {title:"tested",description : "testing update task",no_volunteer: "5"};
        const packet = {id: id, newData: newData};
        const res = await request("http://localhost:8080").post('/task/updateInfo').send(packet).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Task updated successfully');
    });
 
});