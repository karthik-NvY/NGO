const request = require('supertest')

/*
    Last test makes a new entry into database. 
    If the test needs to be run again, change the request to make
    a new entry.
*/

describe('User Signup', () => {
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
        // Make a new user
        const newuserpacket = {name:"name", password:"pass", email:"tmp@gmail.com"}
        const res = await request("http://localhost:8080").post('/user/signup').send(newuserpacket)
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User registration successfully done');

        // Login with new user to get token.
        const newloginres = await request("http://localhost:8080").post('/user/login').send(newuserpacket)

        // Delete new user.
        const deletepacket = {token:newloginres.body.token};
        await request("http://localhost:8080").post('/user/delete').send(deletepacket)
    });    
});
