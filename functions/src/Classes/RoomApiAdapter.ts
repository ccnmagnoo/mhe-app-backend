import getCityDetails from '../Tools/getCityDetails';
import { IClassroom } from './Classroom.interface';
import { LandType } from './LandType.enum';

export default class RoomApiAdapter {
  readonly classroom: IClassroom[];

  constructor(classroom: IClassroom[]) {
    this.classroom = classroom;
  }

  get api() {
    return {
      rooms: this.classroom.map((room, index) => {
        return {
          index: index,
          idCal: room.idCal,
          date: room.placeActivity.date,
          colaborator: room.colaborator,
          cityOnOp: room.cityOnOp,
          province: getCityDetails(room.cityOnOp, LandType.city)?.province,
          encompass: room.land.name,
          encompassType: room.land.type,
          attendees: room.attendees.length,
          enrolled: room.enrolled.length,
          delivery: room.placeDispatch?.date,
        };
      }),
    };
  }
}
