import { IBeneficiary } from '../Classes/Beneficiary.interface';
import getAge from '../Tools/getAge';

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
      date: this._person.dateUpdate,
      room: this._person.classroom.idCal,
      gender: this._person.gender,
      age: getAge(this._person.rut),
      sign: this._person.sign,
      dateSign: this._person.dateSign,
    };
  }
}
