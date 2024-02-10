const { sendOTP_userSignup, userSignup } = require('../routes/api/userSignup');

jest.mock('../models/emailsModel', () => ({
    findOne: jest.fn(),
    save: jest.fn()
}));

jest.mock('../models/OTPmodel', () => ({
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    save: jest.fn()
}));
const Users = require('../models/emailsModel');
const authenticationOTP = require('../models/OTPmodel');
describe('sendOTP_userSignup', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock calls before each test
    });

    test('should send OTP when user does not exist', async () => {
        const req = { body: { name: 'John', email: 'john@example.com' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        Users.findOne.mockResolvedValue(null);

        await sendOTP_userSignup(req, res);

        expect(Users.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        expect(res.status).not.toHaveBeenCalledWith(400);
    });
    
    test('shouldn\'t send OTP when user exist', async () => {
        const req = { body: { name: 'John', email: 'john@example.com' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const userExists = {
            name: 'John',
            email: 'john@example.com'
        };

        Users.findOne.mockResolvedValue(userExists);

       // Users.findOne.mockResolvedValue(null);

        await sendOTP_userSignup(req, res);

        expect(Users.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    });

    // Add more test cases as needed
});

describe('userSignup', () => {
    test('should signup user with valid OTP', async () => {
        const req = {
            body: {
                name: 'John',
                email: 'john@example.com',
                password: 'password123',
                otp: '123456',
                submitTime: new Date()
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        const userExists = {
            otp: '123456',
            otpCreationTime: new Date()
        };

        authenticationOTP.findOne.mockResolvedValue(userExists);

        Users.findOne.mockResolvedValue(null);
        Users.findOne.mockResolvedValueOnce(null);

        await userSignup(req, res);

        expect(Users.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        expect(Users.findOne).toHaveBeenCalledTimes(1); // Called to check user existence and to save new user
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
    test('shouldn\'t signup user with invalid OTP', async () => {
        const req = {
            body: {
                name: 'John',
                email: 'john@example.com',
                password: 'password123',
                otp: '123457',
                submitTime: new Date()
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        const userExists = {
            otp: '123456',
            otpCreationTime: new Date()
        };

        authenticationOTP.findOne.mockResolvedValue(userExists);

        Users.findOne.mockResolvedValue(null);
        Users.findOne.mockResolvedValueOnce(null);

        await userSignup(req, res);

        expect(Users.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
        expect(Users.findOne).toHaveBeenCalledTimes(1); // Called to check user existence and to save new user
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    });

    // Add more test cases for different scenarios
});
