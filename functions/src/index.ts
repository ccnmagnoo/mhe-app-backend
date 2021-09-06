import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dbKey } from './databaseKeys';
import { IBeneficiary, iBeneficiaryConverter } from './Beneficiary.interface';
import { IClassroom, iClassroomConverter } from './Classroom.interface';
import * as nodemailer from 'nodemailer';
import { provider } from './config/mailProvider';

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

export async function mailer(
  classroom: IClassroom | undefined,
  beneficiary: IBeneficiary
) {
  let transporter = nodemailer.createTransport(provider);
  try {
    const time = classroom?.placeActivity.date;

    let info = await transporter.sendMail({
      from: `"Equipo Con Buena Energía 💚" <${provider.auth.user}>`, // sender address
      to: provider.auth.user, // list of receivers
      subject: 'Inscripción Con Buena Energía', // Subject line
      html: `<div>
      <h3>Con Buena Energía del Ministerio de Energía</h3>
        <div> 
          <h4>Bienvenid@ ${beneficiary.name.firstName}</h4>
          <p>te has inscrito en el taller Taller co-organizado con ${
            classroom?.colaborator ?? 'indefinido'
          }</p>
          <p>a realizarse el ${time?.toLocaleDateString()}</p>
          <p>tu link de dirección de acceso es aquí 👉 <a href=${
            classroom?.placeActivity.dir ?? 'sin lugar'
          }> LINK DE ACCESO </a></p>
          <hr>
          <p>
          Recuerde que el taller tiene como beneficio un kit de ahorro energético,
          este será entregado el ${classroom?.placeDispatch?.date.toLocaleString()} en
          la siguiente dirección <strong>${classroom?.placeDispatch?.dir}</strong>
          </p>
          <hr>
          <p>💚 No olvides participar!!</p>
        </div>
      </div>`, // html body
    });
    console.log('mailer', info.accepted);
  } catch (error) {
    console.log('mailer', error);
  }
}

export { functions as firebase };
