import { IBeneficiary } from '../Classes/Beneficiary.interface';
import { IClassroom } from '../Classes/Classroom.interface';

const emailModel = (room: IClassroom, benf: IBeneficiary): string => {
  return 'email';
};

export default emailModel;
