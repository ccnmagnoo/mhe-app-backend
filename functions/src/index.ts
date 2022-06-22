import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as nodemailer from 'nodemailer';
import { dbKey } from './Tools/databaseKeys';

import { IBeneficiary, iBeneficiaryConverter } from './Classes/Beneficiary.interface';
import { IRoom, IRoomConverter } from './Classes/Classroom.interface';
import { provider, providerf } from './config/mailProvider';
import emailModel from './Tools/emailModel';
import getAge from './Tools/getAge';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://myappt51.firebaseio.com',
});
export const db = admin.firestore();

/////////////////////////////////API REST
const app = express();
app.use(cors({ origin: true }));
app.use(require('./routes/roomReport.routes'));
exports.app = functions.https.onRequest(app);

////////////////////////////////CLOUD FUNCTIONS
/**
 *  @function onCreateBeneficiary
 *  when ypu create a new beneficiary, classroom object must be uptated
 * the @param attendees list in asyncronus way
 */
exports.onCreateConsolidated = functions.firestore
  .document(`${dbKey.act}/${dbKey.uid}/${dbKey.cvn}/{uuid}`)
  .onCreate(async (snapshot, params) => {
    //intances of beneficiary object ✍
    console.log('new consolidated', params.params.uuid);
    //build beneficiary object
    const beneficiary = iBeneficiaryConverter.fromFirestore(snapshot);

    //fetch selected classroom 🎬
    const refRoom = db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .withConverter(IRoomConverter)
      .doc(beneficiary.classroom.uuid);
    const query = await refRoom.get();
    const room = query.data();

    //update attendees list 🎭
    if (room !== undefined && room.attendees.indexOf(beneficiary.uuid) === -1) {
      room.attendees.push(beneficiary.uuid);
      //merge object into room ansycronus
      console.log(
        'updated attendees on:',
        room?.idCal,
        ' ✅ new amount: ',
        room?.attendees.length,
        '🆔 uuid:',
        beneficiary.uuid
      );
      const ref = db
        .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
        .doc(beneficiary.classroom.uuid);

      //update statistic at room object
      const add = admin.firestore.FieldValue.increment(1);
      const genderKey = beneficiary.gender;
      const ageKey = getAge(beneficiary.rut).group;

      //set database
      await ref.set(
        { attendees: room?.attendees, statistics: { [genderKey]: add, [ageKey]: add } },
        { merge: true }
      );

      //increment statistics
    }

    return true;
  });

/**
 *  @function onCreateSuscription
 *  when ypu create a new beneficiary, classroom object must be uptated
 * the @param enrolled list in asyncronus way
 */
exports.onCreateSuscription = functions.firestore
  .document(`${dbKey.act}/${dbKey.uid}/${dbKey.sus}/{uuid}`)
  .onCreate(async (snapshot, params) => {
    //intance of beneficiary object ✍
    console.log('new suscription', params.params.uuid);
    const beneficiary = iBeneficiaryConverter.fromFirestore(snapshot);

    //fetch selected classroom
    const refRoom = db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .withConverter(IRoomConverter)
      .doc(beneficiary.classroom.uuid);
    const query = await refRoom.get();
    const room = query.data();

    //update enrolled list 🎭
    if (room !== undefined && room.enrolled.indexOf(snapshot.id) === -1) {
      room.enrolled.push(snapshot.id);
      //set new list
      console.log(
        'updated enrolled on',
        room?.idCal,
        ' ✅ new amount: ',
        room?.enrolled.length,
        '🆔 social id:',
        beneficiary.rut
      );

      const docRoom = db
        .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
        .doc(beneficiary.classroom.uuid);

      await docRoom.set({ enrolled: room?.enrolled }, { merge: true });
    }
    await mailer(room, beneficiary);

    return true;
  });

/**
 * @function mailer nodemailer services to send basic
 * information of activities to suscribed users.
 */
export async function mailer(room: IRoom | undefined, benf: IBeneficiary) {
  let transporter = nodemailer.createTransport(
    providerf(process.env.EMAIL, process.env.PASS)
  );

  try {
    let info = await transporter.sendMail({
      from: `"Equipo Con Buena Energía 💚" <${provider.auth.user}>`, // sender address
      to: benf.email, // list of receivers
      subject: 'Inscripción Con Buena Energía', // Subject line
      html: emailModel(room, benf), // html body
    });
    console.log('mailer', info.accepted);
  } catch (error) {
    console.log('mailer', error);
  }
}

exports.createCaducousPin = functions.firestore
  .document(`${dbKey.act}/${dbKey.uid}/${dbKey.room}/{uuid}`)
  .onCreate(async (snapshot, params) => {
    //create expirable pin
    const room = IRoomConverter.fromFirestore(snapshot);
    //instance object pin
    room.placeActivity.date.setHours(
      room.placeActivity.date.getHours() + 24 //24 hour lifespan after activity
    );
    const pin = {
      expiration: room.placeActivity.date,
      password: room.idCal.substring(1),
      operator: room.op?.cur,
      update: new Date(),
    };

    const ref = db.collection(`${dbKey.act}/${dbKey.uid}/${dbKey.ext}`).doc();

    return ref.set(pin, { merge: true });
  });

export { functions as firebase };
