// require('dotenv').config({
//   path: '.env.production',
// });

interface Conn {
  host: string;
  port: number;
  secure: boolean;
  auth: { user?: string; pass?: string };
}
//https://app-smtp.sendinblue.com/real-time Services Email
const smtp = 'smtp-relay.sendinblue.com';
const port = 587;

export const provider: Conn = {
  host: process.env.SMTP ?? '',
  port: Number(process.env.GATE) ?? 587,
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
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email,
      pass: password,
    },
  };
};
