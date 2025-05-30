import { LandType } from './LandType.enum';
import { IPlace } from './Place.interface';
import { firebase } from '../index';
import IStatistic from './Statistic.interface';
import { SocialProgram } from './Program';

export interface IRoom {
  uuid: string;
  idCal: string;
  dateInstance: Date;
  enrolled: string[];
  attendees: string[];
  placeActivity: IPlace;
  placeDispatch?: IPlace;
  allowedCities: string[];
  cityOnOp: string;
  colaborator: string;
  land: { type: LandType; name: string };
  vacancies?: number;
  op?: { uuid?: string; cur?: number };
  statistics?: Partial<IStatistic>;
  program?: SocialProgram; //social program name
}

export const IRoomConverter = {
  toFirestore: function (classroom: IRoom) {
    return classroom;
  },
  fromFirestore: function (snapshot: firebase.firestore.QueryDocumentSnapshot): IRoom {
    const it = snapshot.data();

    return {
      uuid: it.uuid,
      idCal: it.idCal,
      dateInstance: it.dateInstance.toDate(),
      enrolled: it.enrolled,
      attendees: it.attendees,
      placeActivity: {
        name: it.placeActivity.name,
        dir: it.placeActivity.dir,
        date: it.placeActivity.date.toDate(),
      },
      placeDispatch: {
        name: it.placeDispatch.name,
        dir: it.placeDispatch.dir,
        date: it.placeDispatch.date.toDate(),
      },
      allowedCities: it.allowedCities,
      cityOnOp: it.cityOnOp,
      colaborator: it.colaborator,
      land: { type: it.land.type as LandType, name: it.land.name },
      vacancies: it.vacancies ?? 150,
      op: { uuid: it.op?.uuid, cur: it.op?.cur },
      statistics: it.statistics,
      program: it.program ?? 'Con Buena Energía',
    };
  },
};
