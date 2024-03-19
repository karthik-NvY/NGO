const request = require('supertest')

// Required.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FpIERhdHRhIiwiZW1haWwiOiIyMDIxY3NiMTEwNkBpaXRycHIuYWMuaW4iLCJpZCI6IjY1ZGExMTdjMjIxNjExMWJmZjVkMGJhOCIsImlhdCI6MTcxMDc5NjY0MiwiZXhwIjoxNzEwODgzMDQyfQ.NO5ON5RKb23gw3uiJHT61jsArdSfgyILaxFv8VRMEL8';

describe('User Profile', () => {
    test('Successful in fetchin user profile', async () => {
        const res = await request("http://localhost:8080").post('/user/profile').set('Cookie', `token=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User profile found');
    });    
});
