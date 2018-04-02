export class TimesheetDetails {
  TimesheetId: number;
  ProjectId: number;
  ProjectName: string;
  UserId: any;

  DateFrom: Date;
  DateTo: Date;
  // in db store as date, but when you load it also convert to hours including rounding minutes to nearest quarter hour
  // method to populate the dropdown used to match this is in Constants.generateTimes()
  DateFromHours: number;
  DateToHours: number;
  // example rounding minutes to nearest half hour, but do it for every 15mins instead.
  // if (scheduleFollowUpDate.Value.Minute < 15 || scheduleFollowUpDate.Value.Minute >= 45)
  // {
  //     scheduleFollowUpDateHours = scheduleFollowUpDate.Value.Hour;
  // }
  // else
  // {
  //     scheduleFollowUpDateHours = scheduleFollowUpDate.Value.Hour + 0.5;
  // }

  TotalHours: number; // calculated field
  Description: string;
}
