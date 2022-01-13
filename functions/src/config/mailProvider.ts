require('dotenv').config({
  path: '.env.production',
});

export const provider = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // user
    pass: process.env.EMAIL_PASS, // password
  },
};
