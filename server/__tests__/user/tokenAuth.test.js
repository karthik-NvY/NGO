const tokenAuth = require("../../middleware/tokenMiddle");
const request = require('supertest')

process.env.JWT_SECRET = 'T02CS305';

describe('Token Authentication Middleware', () => {
    test('Authenticated Request with Valid Token', async () => {
        // Login with a known account to get token.
        const userpacket = { password:"Sai Datta", email:"2021csb1106@iitrpr.ac.in"}
        const loginres = await request("http://localhost:8080").post('/user/login').send(userpacket)

        // Mock a valid token value
        const tokenValue = loginres.body.token;

        // Mock a request object with the token cookie
        const req = {
            body: {
                token: tokenValue
            }
        };

        const res = {};
        const next = jest.fn();
        await tokenAuth(req, res, next);
        expect(next).toHaveBeenCalled();  
    });

    test('Unauthenticated Request without Token', async () => {
        const req = {
            body: {},
            cookies: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await tokenAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: "Autherization failed due to absence of token"
        });
        expect(next).not.toHaveBeenCalled();
    });
});
