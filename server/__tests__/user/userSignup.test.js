const request = require('supertest')

describe('User Login', () => {
    test('Return error if email is missing', async () => {
        const packet = {password:'password', name:'Sai'};
        const res = await request("http://localhost:8080").post('/user/signup').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing credentials');
    });

    test('Return error if password is missing', async () => {
        const packet = {email:'2021csb1142@iitrpr.ac.in', name:'Sai'};
        const res = await request("http://localhost:8080").post('/user/signup').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing credentials');
    });

    test('Return error if name is missing', async () => {
        const packet = {email:'2021csb1142@iitrpr.ac.in', password:'pass'};
        const res = await request("http://localhost:8080").post('/user/signup').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing credentials');
    });

    test('Return error if user with email already exists', async () => {
        const packet = {email:'2021csb1106@iitrpr.ac.in', password:'Sai Datta', name:'Sai Datta'};
        const res = await request("http://localhost:8080").post('/user/signup').send(packet)
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('User already exists');
    });

    test('Successful registration of a new user', async () => {
        const packet = { email:'2021csb1081@iitrpr.ac.in', name:'Karthik', password:'Karthik'};
        const res = await request("http://localhost:8080").post('/user/signup').send(packet)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User registration successfully done');
    });    
});
