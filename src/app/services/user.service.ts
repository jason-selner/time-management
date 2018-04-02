import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants, Roles } from '../../utilities/Constants';
import { EmployeeSimple } from '../models/employee-simple.model';


@Injectable()
export class UserService {
  private user: EmployeeSimple = null;

  constructor(private http: Http) {}

  public getUser(): EmployeeSimple {
    if (!this.user) {
      this.loadUserInfo();
    }
    return this.user;
  }

  public inRole(role: Roles): boolean {
    if (!this.user) {
      this.loadUserInfo();
    }
    return this.user.Roles.includes(role);
  }

  public inRoles(roles: Roles[]): boolean {
    if (!this.user) {
      this.loadUserInfo();
    }
    let found = false;
    roles.forEach(role => {
      if (this.user.Roles.includes(role)) {
        found = true;
      }
    });
    return found;
  }

  loadUserInfo() {
    this.user = new EmployeeSimple();
    this.user.Roles = [Roles.User, Roles.Supervisor, Roles.Admin];
    this.user.FullName = 'Test User';
    this.user.UserId = '00000000-0000-0000-0000-000000000001';
    // const urlEndpoint = 'api/SystemUser/getuser';
    // return new Promise((resolve, reject) => {
    //   this.http
    //     .get(Constants.SERVICE_URL + urlEndpoint, { withCredentials: true })
    //     .map(res => res.json())
    //     .subscribe(
    //       response => {
    //         this.user = response;
    //         resolve(true);
    //       },
    //       err => console.log(err)
    //     );
    // });
  }

}
