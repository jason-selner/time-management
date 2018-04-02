import { Roles } from '../../utilities/Constants';

export class EmployeeSimple {
  UserId: string; // uniqueidentifier
  Roles: Roles[];

  FullName: string;
  Address: string;
  EmailAddress: string;
  JobTitle: string;
}
