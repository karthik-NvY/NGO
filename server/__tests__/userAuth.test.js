const { userLogin } = require('../controllers/userAuthController');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

jest.mock('../models/userModel'); // Mock the database model
// jest.mock('bcrypt');

describe('User Login', () => {
    it('Return error if email is missing', async () => {
        const req = { body: {password:'Saidatta'} };
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

    it('Return error if password is missing', async () => {
        const req = { body: {email:'2021csb1142@iitrpr.ac.in'} };
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

    it('Return error if user not found', async () => {
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

    it('Return error if user exists but password is incorrect', async () => {
        const req = { body: { email: '2021csb1142@iitrpr.ac.in', password: 'password' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockUser = { email: '2021csb1142@iitrpr.ac.in', password: 'password' };
        const entry = Users.findOne.mockResolvedValue(mockUser);
        console.log(Users.prototype)
        jest.spyOn(Users.prototype.methods, 'matchPassword').mockResolvedValue(false);
        //bcrypt.compare.mockResolvedValue(false);
        await userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Incorrect password"
        });
    });

    // it('successful login if user exists and password matches', async () => {
    //     const req = { body: { email: 'test@example.com', password: 'password' } };
    //     const res = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn()
    //     };

    //     const mockUser = { email: 'test@example.com', password: 'password' };
    //     Users.findOne.mockResolvedValue(mockUser);
    //     bcrypt.compare.mockResolvedValue(true);
    //     await userLogin(req, res);

    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith({
    //         success: true,
    //         email: 'test@example.com',
    //         message: 'User login successful'
    //     });
    // });
    
});
