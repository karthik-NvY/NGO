const request = require('supertest')

describe('sending OTP', () => {
    // test('Return error if credentials are missing', async () => {
    //     const packet = {email: null};
    //     const res = await request("http://localhost:8080").post('/otp/get-otp').send(packet)
    //     expect(res.status).toBe(400);
    //     expect(res.body.message).toBe('Missing credentials');
    // });

    // test('User already exists', async () => {
    //     const packet = {email: 'cretchless4@whitehouse.gov'}; 
    //     const res = await request("http://localhost:8080").post('/otp/get-otp').send(packet)
    //     expect(res.status).toBe(409);
    //     expect(res.body.message).toBe('User already exists');
    // });

    test('OTP sent successfully (non registered user)', async () => {
        const packet = {email: 'rishikvudem2002@gamil.com'};
        const res = await request("http://localhost:8080").post('/otp/get-otp').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('OTP sent successfully');
    });    
});