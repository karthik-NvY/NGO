const request = require('supertest')

const UsersAuthController = require('../../controllers/userAuthController');
const Users = require('../../models/userModel');

// Required.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FpIERhdHRhIiwiZW1haWwiOiIyMDIxY3NiMTEwNkBpaXRycHIuYWMuaW4iLCJpZCI6IjY1ZGExMTdjMjIxNjExMWJmZjVkMGJhOCIsImlhdCI6MTcxMDg0MzQyOCwiZXhwIjoxNzEwOTI5ODI4fQ.RQEwM0GL9tbiecjaqSU0iS27cUtuAgZ0SnBgjo75JCA';

describe('User Profile', () => {
    test('Successful in fetchin user profile', async () => {
        const res = await request("http://localhost:8080").post('/user/profile').set('Cookie', `token=${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User profile found');
    });

    test('Return an error when user is not found', async () => {
            const req = { email: 'test@example.com' };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            Users.findOne = jest.fn().mockResolvedValue(null);

            await UsersAuthController.fetchUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "User not found"
            });
    }); 
});
