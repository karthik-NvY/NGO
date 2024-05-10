const request = require('supertest')

const UsersAuthController = require('../../controllers/userAuthController');
const Users = require('../../models/userModel');

describe('User Profile', () => {
    
    test('Successful in fetchin user profile', async () => {
        // Login with a known account to get token.
        const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
        const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)
        token = loginres.body.token;
        // Use token and fetch profile.
        const packet = {token:loginres.body.token};
        const res = await request("http://localhost:8080").post('/user/profile').send(packet).set('Authorization', `Bearer ${token}`);

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
