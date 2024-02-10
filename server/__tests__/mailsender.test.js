const mailSender = require('../services/index');
const nodemailer = require('nodemailer');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
}));

describe('mailSender function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
//////////////   Test 1 : test case when successfully sending the email  /////////////////////
  it('should send email successfully', async () => {

    const email = 'test@example.com';
    const title = 'Test Email';
    const body = '<p>This is a test email</p>';
    const mockTransporter = {
      sendMail: jest.fn().mockResolvedValueOnce('Email sent successfully'),
    };
    nodemailer.createTransport.mockReturnValueOnce(mockTransporter);

    const result = await mailSender(email, title, body);

    expect(result).toEqual('Email sent successfully');
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_FROM,
      to: email,
      subject: title,
      html: body,
    });
  });
///////////////// Test 2 : test case for error while sending   /////////////////////
  it('should handle error when sending email', async () => {

    const email = 'test@example.com';
    const title = 'Test Email';
    const body = '<p>This is a test email</p>';
    const mockError = new Error('Failed to send email');
    const mockTransporter = {
      sendMail: jest.fn().mockRejectedValueOnce(mockError),
    };
    nodemailer.createTransport.mockReturnValueOnce(mockTransporter);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = await mailSender(email, title, body);

    expect(result).toBeUndefined();
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_FROM,
      to: email,
      subject: title,
      html: body,
    });
    expect(consoleSpy).toHaveBeenCalledWith('Failed to send email');
    consoleSpy.mockRestore();
  });
});
