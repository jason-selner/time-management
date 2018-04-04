import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Constants, Roles } from '../../utilities/Constants';
import { ProjectSimple } from '../models/project-simple.model';
import { ProjectDetails } from '../models/project-details.model';
import { EmployeeSimple } from '../models/employee-simple.model';
import { TimesheetDetails } from '../models/timesheet-details.model';
import { EmployeeDetails } from '../models/employee-details.model';

@Injectable()
export class GeneralService {
  constructor(private http: Http) {}

  getProjects(userId: string) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Project/LoadSimple/' + userId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as ProjectSimple[]);
  }
  getDummyProjects(userId: string): ProjectSimple[] {
    const projects: ProjectSimple[] = [];
    for (let i = 1; i < 6; i++) {
      const project = new ProjectSimple();
      project.ProjectId = i;
      project.SupervisorId = 1;
      project.SupervisorName = 'Test User';
      project.Title = 'Project ' + i;
      project.Budget = 10000 * i;
      project.Customer = 'Customer ' + i;
      projects.push(project);
    }
    return projects;
  }

  getProjectDetails(projectId: number, dateFrom: Date, dateTo: Date) {
    // tslint:disable-next-line:max-line-length
    const restUrl: string = Constants.SERVICE_URL + 'api/Project/LoadDetails/' + projectId + '/' + dateFrom.toDateString() + '/' + dateTo.toDateString();
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as ProjectDetails);
  }
  getDummyProjectDetails(projectId: number, dateFrom: Date, dateTo: Date): ProjectDetails {
    const project = new ProjectDetails();
    project.ProjectId = projectId;
    project.SupervisorId = 1;
    project.SupervisorName = 'Test User';
    project.Title = 'Project ' + projectId;
    project.Budget = 100000 * projectId;
    project.Customer = 'Customer ' + projectId;
    project.Employees = this.getDummyEmployeeDetails(projectId, dateFrom, dateTo);
    return project;
  }
  getDummyEmployeeDetails(projectId: number, dateFrom: Date, dateTo: Date): EmployeeDetails[] {
    const employees: EmployeeDetails[] = [];
    for (let i = 1; i < 6; i++) {
      const employee = new EmployeeDetails();
      employee.UserId = '00000000-0000-0000-0000-000000000001';
      employee.Address = '1111 Something Road, Dekalb, IL 60115';
      employee.EmailAddress = 'something@something.com';
      employee.FullName = 'Employee ' + i;
      employee.JobTitle = 'Developer';
      employee.Roles = [Roles.User];
      employee.UserName = 'domain/username';
      employee.Password = 'password';
      employee.Salary = 10000 * i + 50000;
      employee.Timesheets = this.getDummyTimesheetDetails('00000000-0000-0000-0000-000000000001', dateFrom);
      employees.push(employee);
    }
    return employees;
  }

  getEmployees(projectId: number) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Employee/LoadSimple/' + projectId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as EmployeeSimple[]);
  }
  getDummyEmployees(projectId: number): EmployeeSimple[] {
    const employees: EmployeeSimple[] = [];
    for (let i = 1; i < 6; i++) {
      const employee = new EmployeeSimple();
      employee.UserId = '00000000-0000-0000-0000-000000000001';
      employee.Address = '1111 Something Road, Dekalb, IL 60115';
      employee.EmailAddress = 'something@something.com';
      employee.FullName = 'Employee ' + i;
      employee.JobTitle = 'Developer';
      employee.Roles = [Roles.User];
      employees.push(employee);
    }
    return employees;
  }

  getTimesheetDetails(userId: string, date: Date) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Timesheet/LoadDetails/' + userId + '/' + date.toDateString();
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as TimesheetDetails[]);
  }
  getDummyTimesheetDetails(userId: string, date: Date): TimesheetDetails[] {
    const timesheets: TimesheetDetails[] = [];
    for (let i = 1; i < 6; i++) {
      const timesheet = new TimesheetDetails();
      timesheet.DateFrom = date;
      timesheet.DateTo = date;
      timesheet.DateFromHours = i;
      timesheet.DateToHours = i + 1;
      timesheet.ProjectId = i;
      timesheet.ProjectName = 'Project ' + i;
      timesheet.TotalHours = 1;
      timesheet.Description = 'some description';
      timesheet.UserId = userId;
      timesheets.push(timesheet);
    }
    return timesheets;
  }
}
