const request = require('supertest')

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FpIERhdHRhIiwiZW1haWwiOiIyMDIxY3NiMTEwNkBpaXRycHIuYWMuaW4iLCJpZCI6IjY1ZGExMTdjMjIxNjExMWJmZjVkMGJhOCIsImlhdCI6MTcxMzI2NjcyMiwiZXhwIjoxNzEzMzUzMTIyfQ.6ylEITGVmBVoPYDykY-y7f_iY-tqQ9HJJ0UkK1R3gqY';

describe('User Update', () => {
    test('Return error if token is not set properly', async () => {
        const res = await request("http://localhost:8080").post('/user/update')
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Autherization failed due to absence of token');
    });

    test('Return error if no data is being updated', async () => {
        const packet = {token:token};
        const res = await request("http://localhost:8080").post('/user/update').send(packet)
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('No data being updated');
    });

    test('Successful update', async () => {
        const packet = {token:token, newData:{name:"Sai Datta"}};
        const res = await request("http://localhost:8080").post('/user/update').send(packet)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User updated successfully');
    });
});
