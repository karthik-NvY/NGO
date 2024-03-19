const sendVerificationEmail = require('../../services/mailer');
const nodemailer = require('nodemailer');

// Mock nodemailer
jest.mock('nodemailer');

describe('sendVerificationEmail function', () => {
    test('should send verification email successfully', async () => {
        // Mock input values
        const email = 'test@example.com';
        const otp = '123456';

        // Mock sendMail function to resolve successfully
        const sendMailMock = jest.fn().mockResolvedValue('Mail sent successfully');
        const createTransportMock = jest.fn(() => ({
            sendMail: sendMailMock
        }));
        nodemailer.createTransport.mockImplementation(createTransportMock);

        // Call the function
        const result = await sendVerificationEmail(email, otp);

        // Assert the result
        expect(result).toBe('Email sent successfully');
        expect(createTransportMock).toHaveBeenCalledWith({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.MAIL_FROM,
            to: email,
            subject: 'Verification Email',
            html: `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
        });
    });

    test('should throw an error when email sending fails', async () => {
        // Mock input values
        const email = 'test@example.com';
        const otp = '123456';

        // Mock sendMail function to reject with an error
        const sendMailMock = jest.fn().mockRejectedValue(new Error('Failed to send email'));
        const createTransportMock = jest.fn(() => ({
            sendMail: sendMailMock
        }));
        nodemailer.createTransport.mockImplementation(createTransportMock);

        // Call the function and expect it to throw an error
        await expect(sendVerificationEmail(email, otp)).rejects.toThrow('Failed to send email');
        expect(createTransportMock).toHaveBeenCalledWith({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.MAIL_FROM,
            to: email,
            subject: 'Verification Email',
            html: `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
        });
    });
});
