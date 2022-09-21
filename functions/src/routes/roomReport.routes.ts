import { Router } from 'express';
import { IRoom, IRoomConverter } from '../Classes/Classroom.interface';
import { iPersonConverter } from '../Classes/Person.Interface';
import RoomApiAdapter from './RoomApiAdapter';
import { db } from '../index';
import { dbKey as key } from './../Tools/databaseKeys';
import PollApiAdapter from './PollApiAdapter';
import CvnApiAdapter from './CvnApiAdapter';
import { iBeneficiaryConverter } from '../Classes/Beneficiary.interface';

const router = Router();
module.exports = router;
/**
 * @api get Rooms with current year query request
 */
router.get(`/api/rooms`, async (req, res) => {
  //res:https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

  /**
   * @api router for powerBI Report
   */

  if (req.query.key !== key.uid)
    return res.status(500).json({ numberOfRooms: 'wrong api key' });
  if (req.query.year === undefined)
    return res.status(500).json({ numberOfRooms: 'year undefined' });
  if (+(req.query.op ?? 0) < 0 || +(req.query.op ?? 0) > 16) {
    return res.status(500).json({ numberOfRooms: 'op invalid ,must be between 0..16' });
  }
  try {
    //defining filter query parameter
    const yearFilter = req.query.year as string;

    //firebase 🔥🔥🔥
    const refRoom = db
      .collection(`${key.act}/${key.uid}/${key.room}`)
      .where('op.cur', '==', +(req.query.op ?? 1))
      .withConverter(IRoomConverter);

    const query = await refRoom.get();

    //building array from query Snapshot
    const rooms: IRoom[] = query.docs
      .map((snapshot) => {
        return snapshot.data();
      })
      .filter((room) => {
        return room.placeActivity.date.getFullYear().toString() === yearFilter;
      })
      .filter((room) => {
        return room.attendees.length > 0;
      });
    console.log('api room request, return number of rooms: ', rooms.length);
    const roomToApi = new RoomApiAdapter(rooms);

    return res.status(200).json(roomToApi.api);
  } catch (error) {
    return res.status(500).json({ rooms: 'no data found' });
  }
});

/**
 * @api get people answered enery poll
 */
router.get(`/api/energypolls`, async (req, res) => {
  //res:https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

  /**
   * @api router for powerBI Report of consumptions behaviour
   */

  if (req.query.key !== key.uid) return res.status(500).json({ polls: 'wrong api key' });

  try {
    //defining filter query parameter

    //firebase 🔥🔥🔥
    const ref = db.collection(`${key.act}/${key.uid}/${key.sus}`);
    const query = await ref
      .where('energy.electricBill', '>', 0)
      .withConverter(iPersonConverter)
      .get();

    //building array from query Snapshot
    const polls = query.docs.map((it) => {
      const data = new PollApiAdapter(it.data());
      return data.api;
    });

    //beneficiaries.forEach((it) => {
    //ref.doc(it.uuid).set({ rut: it.rut.toLocaleLowerCase() }, { merge: true });
    //});

    return res.status(200).json({ polls: polls });
  } catch (error) {
    return res.status(500).json({ polls: 'no data found' });
  }
});

router.get(`/api/beneficiaries`, async (req, res) => {
  //res:https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

  /**
   * @api router for powerBI Report of consumptions behaviour
   */

  if (req.query.key !== key.uid) return res.status(500).json({ polls: 'wrong api key' });

  try {
    //defining filter query parameter
    const period = req.query.year as string;
    const periodIni = new Date(`${period}/1/1`);
    const periodEnd = new Date(`${period}/12/31`);

    //firebase 🔥🔥🔥
    const ref = db.collection(`${key.act}/${key.uid}/${key.cvn}`);
    const query = await ref
      .where('dateUpdate', '>=', periodIni)
      .where('dateUpdate', '<=', periodEnd)
      .withConverter(iBeneficiaryConverter)
      .get();

    //building array from query Snapshot
    const result = query.docs.map((it) => {
      const data = new CvnApiAdapter(it.data());
      return data.api;
    });

    //beneficiaries.forEach((it) => {
    //ref.doc(it.uuid).set({ rut: it.rut.toLocaleLowerCase() }, { merge: true });
    //});

    return res.status(200).json({ beneficiaries: result });
  } catch (error) {
    return res.status(500).json({ beneficiaries: 'no data found' });
  }
});

router.get('/api/oneroom', async (req, res) => {
  if (req.query.key !== key.uid) return res.status(500).json({ polls: 'wrong api key' });
  try {
    //firebase 🔥🔥🔥
    const ref = db.collection(`${key.act}/${key.uid}/${key.cvn}`);
    const room = req.query.uuid;
    const query = await ref
      .where('classroom.uuid', '==', room)
      .withConverter(iBeneficiaryConverter)
      .get();

    const result = query.docs.map((it) => {
      const data = new CvnApiAdapter(it.data());
      return data.api;
    });

    return res.status(200).json({ beneficiaries: result });
  } catch (error) {
    return res.status(500).json({ beneficiaries: error });
  }
});
