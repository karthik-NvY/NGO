const request = require('supertest')

describe('validating OTP', () => {
    test('Return error if credentials are missing', async () => {
        const packet = {};
        const res = await request("http://localhost:8080").post('/otp/validate-otp').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing credentials');
    });

    test('Return error if credentials are missing', async () => {
        const packet = {email: '2021csb11422iitrpr.ac.in'};
        const res = await request("http://localhost:8080").post('/otp/validate-otp').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing credentials');
    });

    test('Return error if credentials are missing', async () => {
        const packet = {otp : '000000'};
        const res = await request("http://localhost:8080").post('/otp/validate-otp').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing credentials');
    });

    test('If no otp was sent or otp expired (non registered user)', async () => {
        const packet = {email:'2021csb1142@iitrpr.ac.in', otp: '000000'};
        const res = await request("http://localhost:8080").post('/otp/validate-otp').send(packet)
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
    });

    test('Invalid OTP', async () => {
        const packet = {email:'2021eeb1172@iitrpr.ac.in', otp: '891603'};
        const res = await request("http://localhost:8080").post('/otp/validate-otp').send(packet)
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid OTP');
    });
    
     test('OTP Matched', async () => {
        const packet = {email:'2021mcb1250@iitrpr.ac.in', otp: '232081'};
        const res = await request("http://localhost:8080").post('/otp/validate-otp').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('OTP Matched');
    });
});