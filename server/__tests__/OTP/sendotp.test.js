const request = require('supertest')

describe('sending OTP', () => {
    test('Return error if credentials are missing', async () => {
        const packet = {};///////////////////////////////////////////////////////////////////////////////
        const res = await request("http://localhost:8080").post('/otp/get-otp').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing credentials');
    });

    test('User already exists', async () => {
        const packet = {email:'2021csb1142@iitrpr.ac.in'};
        const res = await request("http://localhost:8080").post('/otp/get-otp').send(packet)
        expect(res.status).toBe(409);
        expect(res.body.error).toBe('User already exists');
    });

    test('OTP sent successfully (non registered user)', async () => {
        const packet = {email:'rishikvudem@gmail.com'};
        const res = await request("http://localhost:8080").post('/otp/get-otp').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.error).toBe('OTP sent successfully');
    });    
});