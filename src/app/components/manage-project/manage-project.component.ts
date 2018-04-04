import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Constants, Roles } from '../../../utilities/Constants';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { ProjectDetails } from '../../models/project-details.model';
import { EmployeeDetails } from '../../models/employee-details.model';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  user: EmployeeSimple;
  pForm: FormGroup;
  project: ProjectDetails;
  projectId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: GeneralService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
      this.user = this.userService.getUser();
      this.setForm();
    });
  }

  setForm() {
    // default one week?
    const weekAgo = new Date().setDate(new Date().getDay() - 7);
    this.pForm = this.fb.group({
      FromDate: [weekAgo, Validators.required],
      ToDate: [new Date(), Validators.required]
    });
  }

  loadProject(fromDate: Date, toDate: Date) {
    this.project = this.service.getDummyProjectDetails(this.projectId, fromDate, toDate);
  }

  submitDate() {
    console.log('submitDate enterd');
    if (!this.pForm.valid) {
      return;
    }
    console.log('submitDate hit');
    // TODO: remove following later
    this.project = this.service.getDummyProjectDetails(this.projectId, this.pForm.get('FromDate').value, this.pForm.get('ToDate').value);
    // this.service.getTimesheetDetails(this.user.UserId, this.tsForm.get('Date').value).subscribe(
    //   data => {
    //     this.timesheets = data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  expandButtonClick(data: EmployeeDetails) {
    if (data) {
      this.project.Employees.forEach(employee => {
        if (data.UserId === employee.UserId) {
          if (employee.Expanded) {
            employee.Expanded = false;
          } else {
            employee.Expanded = true;
          }
          console.log(employee.Expanded);
        }
      });
    }
  }
}
