import getCityDetails from '../Tools/getCityDetails';
import { IRoom } from '../Classes/Classroom.interface';
import { LandType } from '../Classes/LandType.enum';

export default class RoomApiAdapter {
  readonly classroom: IRoom[];

  constructor(classroom: IRoom[]) {
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
          region: getCityDetails(room.cityOnOp, LandType.city)?.region,
          deployLand: room.land.name,
          deployType: room.land.type,
          attendees: room.attendees.length,
          enrolled: room.enrolled.length,
          delivery: room.placeDispatch?.date,
          statistics: room.statistics,
          uuid: room.uuid,
        };
      }),
    };
  }
}
