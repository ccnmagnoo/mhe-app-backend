import { firebase } from '../index';
import { IEnergyPoll } from './EnergyPoll.interface';

export interface IPerson {
  uuid: string;
  name: Name;
  rut: string;
  classroom: { idCal: string; uuid: string; dateInstance: Date };
  gender: Gender;
  dateUpdate: Date;
  email: string;
  phone?: string | null;
  address?: Dir;
  energy?: IEnergyPoll;
}

export type Name = {
  firstName: string;
  fatherName: string;
  motherName?: string;
};

export type Dir = {
  dir: string;
  city: string;
};

export enum Gender {
  male = 'M',
  female = 'F',
  nobinary = 'N',
}

export const iPersonConverter = {
  toFirestore: function (person: IPerson) {
    return person;
  },
  fromFirestore: function (snapshot: firebase.firestore.QueryDocumentSnapshot): IPerson {
    const it = snapshot.data();
    return {
      uuid: it.uuid,
      name: it.name,
      rut: it.rut,
      classroom: {
        idCal: it.classroom.idCal,
        uuid: it.classroom.uuid,
        dateInstance: it.classroom.dateInstance.toDate(),
      },
      gender: it.gender as Gender,
      dateUpdate: it.dateUpdate.toDate(),
      email: it.email,
      phone: it.phone,
      address: it.address,
      energy: it.energy,
    };
  },
};
