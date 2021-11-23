import { IPerson } from '../Classes/Person.Interface';

export default class PollApiAdapter {
  private _person: IPerson;

  constructor(person: IPerson) {
    this._person = person;
  }

  get api() {
    return {
      city: this._person.address?.city,
      date: this._person.dateUpdate,
      electricBill: this._person.energy?.electricBill,
      electricity: this._person.energy?.electricity,
      gasBill: this._person.energy?.gasBill,
      gasDuration: this._person.energy?.gasDuration,
    };
  }
}
