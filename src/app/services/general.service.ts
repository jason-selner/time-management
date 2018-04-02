import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../utilities/Constants';
import { ProjectSimple } from '../models/project-simple.model';
import { ProjectDetails } from '../models/project-details.model';
import { EmployeeSimple } from '../models/employee-simple.model';
import { TimesheetDetails } from '../models/timesheet-details.model';

@Injectable()
export class GeneralService {
  constructor(private http: Http) {}

  getProjects(userId: string) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Project/LoadSimple/' + userId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as ProjectSimple[]);
  }
  getProjectDetails(projectId: number, dateFrom: Date, dateTo: Date) {
    // tslint:disable-next-line:max-line-length
    const restUrl: string = Constants.SERVICE_URL + 'api/Project/LoadDetails/' + projectId + '/' + dateFrom.toDateString() + '/' + dateTo.toDateString();
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as ProjectDetails[]);
  }
  getEmployees(projectId: number) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Employee/LoadSimple/' + projectId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as EmployeeSimple[]);
  }
  getTimesheetDetails(userId: string, date: Date) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Timesheet/LoadDetails/' + userId + '/' + date.toDateString();
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as TimesheetDetails[]);
  }
}
