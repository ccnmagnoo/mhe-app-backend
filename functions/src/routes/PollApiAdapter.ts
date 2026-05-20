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
      isIndigenous: this._person.isIndigenous,
      inRiskZone: this._person.resilience?.is_risk_zone,
      riskZone: this._person.resilience?.is_risk_zone,
      energyCut: this._person.resilience?.energy_cut,
      emergencyContact: this._person.resilience?.emergency_contact,
      damageExperience: this._person.resilience?.damage_experience,
    };
  }
}
