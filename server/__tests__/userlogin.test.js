const { userLogin } = require('../routes/api/userlogin');
const Users = require('../models/emailsModel');
const bcrypt = require('bcrypt');

jest.mock('../models/emailsModel'); // Mock the database model
jest.mock('bcrypt');

describe('User Login', () => {
    it('should return error if email or password is missing', async () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Please provide both email and password"
        });
    });

    it('should return error if user not found', async () => {
        const req = { body: { email: 'test@example.com', password: 'password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        Users.findOne.mockResolvedValue(null);

        await userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "User not found"
        });
    });

    it('should return error if password is incorrect', async () => {
        const req = { body: { email: 'test@example.com', password: 'password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
        Users.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);
        await userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Incorrect password"
        });
    });

    it('successful login if user exists and password matches', async () => {
        const req = { body: { email: 'test@example.com', password: 'password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockUser = { email: 'test@example.com', password: 'password' };
        Users.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        await userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            email: 'test@example.com',
            message: 'User login successful'
        });
    });
    
});
