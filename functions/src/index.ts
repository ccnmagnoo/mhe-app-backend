import * as firebase from 'firebase-functions';
import * as admin from 'firebase-admin';
import { dbKey } from './databaseKeys';
import { iBeneficiaryConverter } from './Beneficiary.interface';
import { iClassroomConverter } from './Classroom.interface';

admin.initializeApp();
const db = admin.firestore();

/**
 *  @function onCreateBeneficiary
 *  when ypu create a new beneficiary, classroom object must be uptated
 * the @param attendees list in asyncronus way
 */
exports.onCreateBeneficiary = firebase.firestore
  .document(`${dbKey.act}/${dbKey.uid}/${dbKey.cvn}/{uuid}`)
  .onCreate(async (snapshot, params) => {
    //intances of beneficiary object ✍

    console.log('new consolidated', params.params.uuid);
    const beneficiary = iBeneficiaryConverter.fromFirestore(snapshot);
    console.log('object ID:RUT', beneficiary.rut);

    //fetch selected classroom 🎬
    const refRoom = db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .withConverter(iClassroomConverter)
      .doc(beneficiary.classroom.uuid);
    const query = await refRoom.get();
    const room = query.data();
    console.log('room to update', room?.idCal, room?.colaborator);

    //update attendees list 🎭
    let newAttendees: string[] = [];
    if (room !== undefined && room.attendees.indexOf(beneficiary.uuid) !== -1) {
      newAttendees = room.attendees;
      newAttendees.push(beneficiary.uuid);
    }
  });

/**
 *  @function onCreateSsuscription
 *  when ypu create a new beneficiary, classroom object must be uptated
 * the @param enrolled list in asyncronus way
 */

exports.onCreateSuscription = firebase.firestore
  .document(`${dbKey.act}/${dbKey.uid}/${dbKey.sus}/{uuid}`)
  .onCreate(async (snapshot, params) => {
    //intances of beneficiary object ✍

    console.log('new suscription', params.params.uuid);
    const beneficiary = iBeneficiaryConverter.fromFirestore(snapshot);

    //fetch selected classroom
    const refRoom = db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .withConverter(iClassroomConverter)
      .doc(beneficiary.classroom.uuid);
    const query = await refRoom.get();
    const room = query.data();
    console.log('room to update', room?.idCal, room?.colaborator);
  });

export { firebase };
