const request = require('supertest')

describe('Ngo tasks', () => {
    let newloginres
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        newloginres = await request("http://localhost:8080").post('/user/login').send(userpacket);
        token = newloginres.body.token
    });
    test('Return error if ngo id is missing', async () => {
        const packet = {};
        const res = await request("http://localhost:8080").post('/api/ngoTask').send(packet).set('Authorization', `Bearer ${token}`)
        //console.log(res.body);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing NGO ID');
    });

    test('Return if no tasks found', async () => {
        const packet = {ngo_id: "65f04de683c50c03dfd91263" };
        const res = await request("http://localhost:8080").post('/api/ngoTask').send(packet).set('Authorization', `Bearer ${token}`)
        //console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('No Tasks found');
    });

    test('Return tasks if found', async () => {
        const packet = {ngo_id: '65da11a82216111bff5d0bae'};
       // const res = await request("http://localhost:8080").post('/task/storeInfo').send(packet)
        const res = await request("http://localhost:8080").post('/api/ngoTask').send(packet).set('Authorization', `Bearer ${token}`)
        //console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Tasks found');
    });
 
});