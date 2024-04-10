const tokenAuth = require("../../middleware/tokenMiddle");

process.env.JWT_SECRET = 'T02CS305';

describe('Token Authentication Middleware', () => {
    test('Authenticated Request with Valid Token', async () => {
        // Mock a valid token value
        const tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FpIERhdHRhIiwiZW1haWwiOiIyMDIxY3NiMTEwNkBpaXRycHIuYWMuaW4iLCJpZCI6IjY1ZGExMTdjMjIxNjExMWJmZjVkMGJhOCIsImlhdCI6MTcxMDc5NjY0MiwiZXhwIjoxNzEwODgzMDQyfQ.NO5ON5RKb23gw3uiJHT61jsArdSfgyILaxFv8VRMEL8';

        // Mock a request object with the token cookie
        const req = {
            cookies: {
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
            message: "Autherization failed due to absence of token"
        });
        expect(next).not.toHaveBeenCalled();
    });
});
