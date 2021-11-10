import { IClassroom } from './Classroom.interface';

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
