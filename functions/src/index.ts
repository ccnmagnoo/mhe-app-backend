import * as functions from 'firebase-functions';
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
exports.onCreateBeneficiary = functions.firestore
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
    if (room !== undefined && room.attendees.indexOf(beneficiary.uuid) !== -1) {
      room.attendees.push(beneficiary.uuid);
      //merge object into room ansycronus
      console.log(
        'updated classroom attendees',
        room?.idCal,
        ' ✅ new amount: ',
        room.attendees.length
      );
    }

    return db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .doc(beneficiary.classroom.uuid)
      .set({ attendees: room?.attendees }, { merge: true });
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
    console.log('object ID:RUT', beneficiary.rut);

    //fetch selected classroom
    const refRoom = db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .withConverter(iClassroomConverter)
      .doc(beneficiary.classroom.uuid);
    const query = await refRoom.get();
    const room = query.data();
    console.log('room to update', room?.idCal, room?.colaborator);

    //update enrolled list 🎭
    if (room !== undefined && room.enrolled.indexOf(beneficiary.uuid) !== -1) {
      room.enrolled.push(beneficiary.uuid);

      console.log(
        'updated classroom enrolled',
        room?.idCal,
        ' ✅ new amount: ',
        room.enrolled.length
      );
    }
    //set new list

    return db
      .collection(`${dbKey.act}/${dbKey.uid}/${dbKey.room}`)
      .doc(beneficiary.classroom.uuid)
      .set({ enrolled: room?.enrolled }, { merge: true });
  });

export { functions as firebase };
