// require('dotenv').config({
//   path: '.env.production',
// });

interface Conn {
  host: string;
  port: number;
  secure: boolean;
  auth: { user?: string; pass?: string };
}

export function provider(user?: string, pass?: string) {
  const conn: Conn = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
      // user: process.env.EMAIL_USER, // user
      // pass: process.env.EMAIL_PASS, // password
    },
  };
  return conn;
}
