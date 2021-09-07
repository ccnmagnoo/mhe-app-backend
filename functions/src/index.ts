import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { dbKey } from './databaseKeys';
import { IBeneficiary, iBeneficiaryConverter } from './Beneficiary.interface';
import { IClassroom, iClassroomConverter } from './Classroom.interface';
import { provider } from './config/mailProvider';
import timeLocale from './timeLocale';

admin.initializeApp();
const db = admin.firestore();

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
    const beneficiary = iBeneficiaryConverter.fromFirestore(snapshot);

    //fetch selected classroom 🎬
    const refRoom = db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .withConverter(iClassroomConverter)
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

      //set database
      await ref.set({ attendees: room?.attendees }, { merge: true });
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
      .withConverter(iClassroomConverter)
      .doc(beneficiary.classroom.uuid);
    const query = await refRoom.get();
    const room = query.data();

    //update enrolled list 🎭
    if (room !== undefined && room.enrolled.indexOf(beneficiary.uuid) === -1) {
      room.enrolled.push(beneficiary.uuid);
      //set new list
      console.log(
        'updated enrolled on',
        room?.idCal,
        ' ✅ new amount: ',
        room?.enrolled.length,
        '🆔 uuid:',
        beneficiary.uuid
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
export async function mailer(room: IClassroom | undefined, benf: IBeneficiary) {
  let transporter = nodemailer.createTransport(provider);

  try {
    const time = room?.placeActivity.date;

    let info = await transporter.sendMail({
      from: `"Equipo Con Buena Energía 💚" <${provider.auth.user}>`, // sender address
      to: benf.email, // list of receivers
      subject: 'Inscripción Con Buena Energía', // Subject line
      html: `<body>
      <h3>Con Buena Energía del Ministerio de Energía</h3>
        <section> 
          <h4>Bienvenid@ ${benf.name.firstName}</h4>
          <p>Se ha inscrito en el taller "Con Buena Energía" Taller co-organizado con ${
            room?.colaborator ?? 'indefinido'
          } a realizarse el ${timeLocale(time)}.</p>
  
          <p>Deberá conectarse ese día mediante el siguiente de acceso 👉 <a href=${
            room?.placeActivity.dir
          }> Link de Acceso </a></p>
          <br>
          No lo pierdas<br><br>
          <p>
          Recuerde que el taller tiene como beneficio un kit de ahorro energético,
          este será entregado el ${timeLocale(room?.placeDispatch?.date)}  
          <br>
          en la siguiente dirección:
          <br> 
          ${room?.placeDispatch?.name},<strong>${room?.placeDispatch?.dir}</strong>
          </p>
          <br>
          <p>💚 No olvides participar ${benf.name.firstName}!, nos vemos 👋</p>
        </section>
      </body>`, // html body
    });
    console.log('mailer', info.accepted);
  } catch (error) {
    console.log('mailer', error);
  }
}

export { functions as firebase };
