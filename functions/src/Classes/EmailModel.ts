import { IBeneficiary } from './Beneficiary.interface';
import { IRoom } from './Classroom.interface';

type EmailModel = (room?: IRoom, benf?: IBeneficiary) => string;

export default EmailModel;
