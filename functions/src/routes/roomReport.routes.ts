import { Router } from 'express';
import { IClassroom, iClassroomConverter } from '../Classes/Classroom.interface';
import { db } from '../index';
import { dbKey as key } from './../Tools/databaseKeys';

const router = Router();
module.exports = router;

router.get(`/api/rooms/:key`, async (req, res) => {
  /**
   * @api router for powerBI Report
   */
  if (req.params.key !== 'yyz')
    return res.status(500).json({ numberOfRooms: 'wrong key' });

  try {
    const refRoom = db
      .collection(`${key.act}/${key.uid}/${key.room}`)
      .withConverter(iClassroomConverter);

    const query = await refRoom.get();

    const rooms: IClassroom[] = query.docs.map((snapshot) => {
      return snapshot.data();
    });

    return res.status(200).json({ numberOfRooms: rooms.length });
  } catch (error) {
    return res.status(500).json({ numberOfRooms: 'no data found' });
  }
});
