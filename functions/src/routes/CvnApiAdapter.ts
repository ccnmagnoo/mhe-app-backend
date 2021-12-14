import { IBeneficiary } from '../Classes/Beneficiary.interface';

export default class CvnApiAdapter {
  private _person: IBeneficiary;

  constructor(person: IBeneficiary) {
    this._person = person;
  }

  get api() {
    return {
      name: this._person.name.firstName,
      father: this._person.name.fatherName,
      mother: this._person.name.motherName,
      rut: this._person.rut,
      address: this._person.address?.dir,
      city: this._person.address?.city,
      date: this._person.classroom.dateInstance,
      room: this._person.classroom.idCal,
    };
  }
}
