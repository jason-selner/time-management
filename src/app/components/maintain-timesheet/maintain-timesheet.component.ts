import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Constants, Roles } from '../../../utilities/Constants';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { TimesheetDetails } from '../../models/timesheet-details.model';
import { MaintainTimesheetDialogComponent } from '../maintain-timesheet-dialog/maintain-timesheet-dialog.component';

@Component({
  selector: 'app-maintain-timesheet',
  templateUrl: './maintain-timesheet.component.html',
  styleUrls: ['./maintain-timesheet.component.css']
})
export class MaintainTimesheetComponent implements OnInit {
  user: EmployeeSimple;
  tsForm: FormGroup;
  timesheets: TimesheetDetails[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: GeneralService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.setForm();
  }

  setForm() {
    // default timesheet date to today?
    this.tsForm = this.fb.group({
      Date: [new Date(), Validators.required]
    });
    this.timesheets = this.service.getDummyTimesheetDetails(this.user.UserId, new Date());
  }

  submitDate() {
    console.log('submitDate enterd');
    if (!this.tsForm.valid) {
      return;
    }
    console.log('submitDate hit');
    // TODO: remove following later
    this.timesheets = this.service.getDummyTimesheetDetails(this.user.UserId, this.tsForm.get('Date').value);
    // this.service.getTimesheetDetails(this.user.UserId, this.tsForm.get('Date').value).subscribe(
    //   data => {
    //     this.timesheets = data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  createTimesheet() {
    const dialogRef = this.dialog.open(MaintainTimesheetDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { timesheet: null, action: 'Submit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.date && result.hours !== undefined) {
      }
    });
  }

  editTimesheet(ts: TimesheetDetails) {
    const dialogRef = this.dialog.open(MaintainTimesheetDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { timesheet: ts, action: 'Submit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.date && result.hours !== undefined) {
      }
    });
  }

  deleteTimesheet(ts: TimesheetDetails) {}
}
