const { userLogin } = require('../controllers/userAuthController');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const request = require('supertest')

// app = require("../server-test")

// const server = app.listen(process.env.PORT, ()=>{
//     console.log(`Server listening on ${process.env.PORT}....`)
// })

// async function main(){
//     const DbConnect = require('../configs/mongo');
//     Dbconnection = await DbConnect();
// }
// main();

describe('User Login', () => {
    test('Return error if email is missing', async () => {
        const packet = {password:'password'};
        const res = await request("http://localhost:8080").post('/user/login').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Please provide both email and password');
    });

    test('Return error if password is missing', async () => {
        const packet = {email:'2021csb1142@iitrpr.ac.in'};
        const res = await request("http://localhost:8080").post('/user/login').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Please provide both email and password');
    });

    test('Return error if user not found', async () => {
        const packet = {email:'nomail@like.this', password:'nopass'};
        const res = await request("http://localhost:8080").post('/user/login').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User not found');
    });

    test('Return error if user exists but password is incorrect', async () => {
        const packet = { email: '2021csb1142@iitrpr.ac.in', password: 'password' };
        const res = await request("http://localhost:8080").post('/user/login').send(packet)
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Incorrect password')
    });

    test('Successful login if user exists and password matches', async () => {
        const packet = {email: '2021csb1106@iitrpr.ac.in', password: 'Sai Datta'};
        const res = await request("http://localhost:8080").post('/user/login').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User login successful')
    });
    
});

// server.close();
