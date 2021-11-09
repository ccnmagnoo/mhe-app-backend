import { IClassroom } from './Classroom.interface';

export default class RoomApiAdapter {
  readonly uuid: string;
  readonly classroom: IClassroom;

  constructor(classroom: IClassroom) {
    this.classroom = classroom;
    this.uuid = classroom.uuid;
  }

  get api() {
    return null;
  }
}
