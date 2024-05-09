const request = require('supertest')

describe('Adding Role on signup', () => {
    let loginres;
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        loginres = (await request("http://localhost:8080").post('/user/login').send(userpacket))
        token = loginres.body.token;
    });
    test('Return error if token not set properly', async () => {
        const packet = { 
            ngo_id :  "65f04de683c50c03dfd91263",
            role : "volunteer",   
        };
        const res = await request("http://localhost:8080").post('/roles/signupRole').send(packet)
        console.log(res.body);
        expect(res.status).toBe(401);
    });
    test('Return error if ngo id is missing', async () => {
        const packet = { 
            user_id :  "65f04de683c50c03dfd91263",
            role : "volunteer",   
        };
        const res = await request("http://localhost:8080").post('/roles/signupRole').send(packet).set('Authorization', `Bearer ${token}`)
        console.log(res.body);
        expect(res.status).toBe(500);
    });
    test('Successfully added role of a user for an Ngo', async () => {
        const packet = {
            ngo_id: '65da11a82216111bff5d0bae',
            role : "volunteer", 
            user_id: '65da117c2216111bff5d0b44'            };
        const res = await request("http://localhost:8080").post('/roles/signupRole').send(packet).set('Authorization', `Bearer ${token}`)
        //console.log(res.body);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Role signed up successfully');
    });
 
});

describe('deleting Role', () => {
    let loginres;
    beforeAll(async () => {
        // Login to get token.
        const userpacket = { password: "Sai Datta", email: "2021csb1106@iitrpr.ac.in" };
        loginres = (await request("http://localhost:8080").post('/user/login').send(userpacket))
        token = loginres.body.token;
    });
    test('Successfully deleted role of a user for an Ngo', async () => {
        const packet = {
            ngo_id: '65da11a82216111bff5d0bae',
            user_id: '65da117c2216111bff5d0b44'            };
        const res = await request("http://localhost:8080").post('/roles/deleteRole').send(packet).set('Authorization', `Bearer ${token}`)
        //console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Role removed successfully');
    });
 
});