import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CalendarService } from "../services/CalendarService";
import { ICalendarEvent } from "../interfaces/ICalendarEvent";
import { forkJoin, map, Observable } from "rxjs";
import { TaskService } from "../services/TaskService";
import { ITask } from "../interfaces/ITask";
import { ProgressService } from "../services/ProgressService";
import { GoalService } from "../services/GoalService";
import { IGoal } from "../interfaces/IGoal";


@Injectable()
export class CalendarResolver implements Resolve<{ calendarEvents: ICalendarEvent[], tasks: ITask[], goals: IGoal[] }> {
  constructor(
    private readonly _calendarService: CalendarService,
    private readonly _taskService: TaskService,
    private readonly _goalService: GoalService,
    private readonly _progressService: ProgressService
  ) {}

  public resolve(): Observable<{ calendarEvents: ICalendarEvent[], tasks: ITask[], goals: IGoal[] }> {
    return forkJoin([
      this._calendarService.getAllEvents(),
      this._taskService.getAllTasks(),
      this._goalService.getAllGoals()
    ]).pipe(
      map(([calendarEvents, tasks, goals]) => {
        return { calendarEvents, tasks, goals };
      })
    );
  }
}
