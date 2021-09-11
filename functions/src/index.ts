import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { dbKey } from './Tools/databaseKeys';
import { IBeneficiary, iBeneficiaryConverter } from './Classes/Beneficiary.interface';
import { IClassroom, iClassroomConverter } from './Classes/Classroom.interface';
import { provider } from './config/mailProvider';
import timeLocale from './Tools/timeLocale';
import getLinkAddress from './Tools/getLinkAddress';

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
      html: `
      <body>
        <img 
        src="https://conbuenaenergia.web.app/static/media/cbelogo.0e6fc453.svg" 
        alt="con buena energía" 
        height=80px>
  
        <section style="
        box-shadow: 2px 2px 5px Gray;
        background-color:White;
        padding:20px;
        margin:auto;
        border-radius:20px;
        border:solid 1px Silver;
        max-width:600px;
        "
        > 
          <h3>
          Con Buena Energía <br>
          <span style="
          color:Gray;
          font-size: 1.2rem
          ">del Ministerio de Energía</span>
          </h3>

          <h4>Felicidades ${benf.name.firstName}</h4>

          <p>
          Se ha inscrito existosamente en el taller "Con Buena Energía", realizado en colaboración con  ${
            room?.colaborator ?? 'indefinido'
          } a realizarse el ${timeLocale(time)}.
          </p>
  
          <p>
          Deberá conectarse ese día mediante el siguiente de acceso 👉 
          <a 
          style="
          text-decoration:none;
          color:White;
          background:linear-gradient(to top left, Red 0%, Salmon 100%);
          padding:5px;
          border-radius:5px;
          "
          href=${getLinkAddress(room?.placeActivity.dir)}
          > Acceso Taller </a>
          </p>
     
          <p>
          Recuerde que al participar en el taller y cumplir con los quisitos,
          usted tiene derecho a un kit de ahorro energético, que será entregado el
          próximo  ${timeLocale(room?.placeDispatch?.date)} en la siguiente dirección:<br>

          <address>
          ${room?.placeDispatch?.name},<br>
          <strong><a href=${getLinkAddress(room?.placeDispatch?.dir)}>${
        room?.placeDispatch?.dir
      }</a></strong>
          </address>
          </p>
          
          <p style="
          background:PapayaWhip;
          padding:10px;
          margin:auto;
          max-width:400px;

          border-radius:20px;
          border:solid 2px PeachPuff;
         
          color:Gray;
          font-size:0.9rem;
          text-align:justify;
          ">
          <span style="color:Salmon;">¿Qué pasa si no puedo retirar mi kit?</span><br>
          <article>
          En el caso que por fuerza mayor no pueda ir 
          a retirar el kit personalmente, usted puede enviar un representante con un 
          <strong>poder simple</strong> con la autorización el retiro de su kit
          indicando su nombre completo ,rut y firma.
          </article>
          </p>

          <p>
          Si quiere saber más del cómo ahorrar energía y dinero en su hogar , puedes descargar nuestra guía de la 
          <a 
          style="
          text-decoration:none;
          color:White;
          background:linear-gradient(to top left, RoyalBlue 0%, DodgerBlue 100%);
          padding:2px;
          border-radius:5px;
          "
          target="_blank"
          href="https://www.mienergia.cl/sites/default/files/cuadernillo_guia_energia-baja.pdf"
          > Casa Eficiente </a>

          </p>
          <p>No olvide participar ${benf.name.firstName}, nos vemos👋</p>
          <p>Atentamente Equipo Con Buena Energía</p>
        </section>
        <br>
        <section style="color:Gray;font-size:1rem">
        token:${benf.uuid}
        <br>rut:${benf.rut}
        <br>suscription:${benf.dateUpdate.toISOString()}
        </section>
      </body>`, // html body
    });
    console.log('mailer', info.accepted);
  } catch (error) {
    console.log('mailer', error);
  }
}

export { functions as firebase };
