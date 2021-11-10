import { Router } from 'express';
import { IClassroom, iClassroomConverter } from '../Classes/Classroom.interface';
import { db } from '../index';
import { dbKey as key } from './../Tools/databaseKeys';

const router = Router();
module.exports = router;

router.get(`/api/rooms`, async (req, res) => {
  //res:https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

  /**
   * @api router for powerBI Report
   */

  if (req.query.key !== 'yyz')
    return res.status(500).json({ numberOfRooms: 'wrong key' });
  if (req.query.year === undefined)
    return res.status(500).json({ numberOfRooms: 'year undefined' });

  try {
    //defining filter query parameter
    const yearFilter = req.query.year as string;

    //firebase 🔥🔥🔥
    const refRoom = db
      .collection(`${key.act}/${key.uid}/${key.room}`)
      .withConverter(iClassroomConverter);

    const query = await refRoom.get();

    //building array from query Snapshot
    const rooms: IClassroom[] = query.docs
      .map((snapshot) => {
        return snapshot.data();
      })
      .filter((room) => {
        return room.placeActivity.date.getFullYear().toString() === yearFilter;
      });

    return res.status(200).json({ numberOfRooms: rooms.length });
  } catch (error) {
    return res.status(500).json({ numberOfRooms: 'no data found' });
  }
});
