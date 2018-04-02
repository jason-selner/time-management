import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimesheetDetails } from '../../models/timesheet-details.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants, Roles } from '../../../utilities/Constants';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { ProjectSimple } from '../../models/project-simple.model';

@Component({
  selector: 'app-maintain-timesheet-dialog',
  templateUrl: './maintain-timesheet-dialog.component.html',
  styleUrls: ['./maintain-timesheet-dialog.component.css']
})
export class MaintainTimesheetDialogComponent {
  editTsForm: FormGroup;
  maxCharacters = 2000;
  charactersLeft = 2000;
  timesList: any[];
  projects: ProjectSimple[];

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<MaintainTimesheetDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (!data.actionButtonColor) {
      data.actionButtonColor = 'submit';
    }
    if (!data.cancelAction) {
      data.cancelAction = 'Cancel';
    }
    if (data.timesheet) {
      // edit timesheet
      this.setForm(data.timesheet);
    } else {
      // create timesheet
      this.setForm(null);
    }
    this.timesList = Constants.HOURS;
  }

  setForm(ts: any) {
    this.editTsForm = this.fb.group({
      From: [ts !== null ? ts.DateFromHours : null, Validators.required],
      To: [ts !== null ? ts.DateToHours : null, Validators.required],
      ProjectId: [ts !== null ? ts.ProjectId : null, Validators.required],
      Description: [ts !== null ? ts.Description : null, Validators.required]
    });
  }

  descriptionOnKeyUp(event) {
    this.charactersLeft = this.maxCharacters - event.target.value.length;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
