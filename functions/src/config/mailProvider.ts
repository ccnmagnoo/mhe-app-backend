// require('dotenv').config({
//   path: '.env.production',
// });

interface Conn {
  host: string;
  port: number;
  secure: boolean;
  auth: { user?: string; pass?: string };
}
const smtp = 'smtp-relay.gmail.com';

export const provider: Conn = {
  host: smtp,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
    // user: process.env.EMAIL_USER, // user
    // pass: process.env.EMAIL_PASS, // password
  },
};

export const providerf = (email?: string, password?: string): Conn => {
  console.log('provider email', email, password);
  return {
    host: smtp,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email,
      pass: password,
      // user: process.env.EMAIL_USER, // user
      // pass: process.env.EMAIL_PASS, // password
    },
  };
};
