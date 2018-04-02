import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './services/user.service';
import { EmployeeSimple } from './models/employee-simple.model';
import { Constants } from '../utilities/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user: EmployeeSimple;
  activate = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user.UserId !== Constants.GUID_EMPTY && Constants.isGuid(this.user.UserId)) {
      this.activate = true;
    }
  }
  ngOnDestroy() { }
}
