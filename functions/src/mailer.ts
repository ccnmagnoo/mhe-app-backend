//import { IBeneficiary } from './Beneficiary.interface';
//import { IClassroom } from './Classroom.interface';
import { provider } from './mailProvider';
import * as nodemailer from 'nodemailer';

export async function mailer(/*classroom: IClassroom, beneficiary: IBeneficiary*/) {
  let transporter = nodemailer.createTransport(provider);
  try {
    let info = await transporter.sendMail({
      from: '"Equipo Con Buena Energía 💚" <ccamposn@minenergia.cl>', // sender address
      to: 'ccamposn@minenergia.cl', // list of receivers
      subject: 'Inscripción a Con Buena Energía', // Subject line
      text: 'Hello world?', // plain text body
      html: '<h3>Hello world?</h3>', // html body
    });
    console.log('mailer', info.accepted);
  } catch (error) {
    console.log('mailer', error);
  }
}
