import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarService } from "../../core/services/CalendarService";
import { ICalendarEvent } from "../../core/interfaces/ICalendarEvent";
import { ActivatedRoute } from "@angular/router";
import { AbstractFormManager } from "../../../../assets/abstarcts/AbstarctFormManager";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../../core/services/NotificationService";
import { finalize } from "rxjs";
import { TaskStatusEnum } from "../../core/enums/TaskStatusEnum";
import { TaskPriorityEnum } from "../../core/enums/TaskPriorityEnum";
import { TaskService } from "../../core/services/TaskService";
import { ITask } from "../../core/interfaces/ITask";
import { GoalStatusEnum } from "../../core/enums/GoalStatusEnum";
import { GoalService } from "../../core/services/GoalService";
import { ProgressService } from "../../core/services/ProgressService";
import { IGoal } from "../../core/interfaces/IGoal";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent extends AbstractFormManager {
  public calendarEvents: ICalendarEvent[] = [];
  public tasks: ITask[] = [];
  public goals: IGoal[] = [];
  public goalForm: FormGroup;
  public progressForm: FormGroup;
  public taskForm: FormGroup;
  public isEditTask = false;
  public isEditGoal = false;
  public editingTask: ITask;
  public editingGoal: IGoal;
  public pickedGoalIdToAddProgress: number;
  public readonly taskStatusEnum = TaskStatusEnum;
  public readonly taskPriorityEnum = TaskPriorityEnum;
  public readonly goalStatusEnum = GoalStatusEnum;

  constructor(
    private readonly _calendarService: CalendarService,
    private readonly _route: ActivatedRoute,
    private readonly _notificationService: NotificationService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _taskService: TaskService,
    private readonly _goalService: GoalService,
    private readonly _progressService: ProgressService,
  ) {
    super({
      title: { validate: true, validators: [Validators.required] },
      startingDate: { validate: true, validators: [Validators.required] },
      deadline: { validate: true, validators: [Validators.required] },
      description: { validate: true, validators: [Validators.required] }
    });

    this.goalForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      createdDate: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });

    this.progressForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });

    this.taskForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      createdDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      relatedTagsOrCategories: new FormControl('', [Validators.required])
    });

    const { calendarEvents, tasks, goals } = this._route.snapshot.data['calendarData'];
    this.calendarEvents = calendarEvents;
    this.tasks = tasks;
    this.goals = goals;
  }

  public addEvent(): void {
    this.validateForm(this.form);

    if (this.form.valid) {
      this._calendarService.addEvent(this.form.value).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((newEvent) => {
        this.calendarEvents.push(newEvent);
        this._notificationService.pushSuccess("Wydarzenie dodane pomyślnie.");
      }, error => {
        this._notificationService.pushSuccess("Wystąpił błąd podczas dodawania wydarzenia.");
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public addGoal(): void {
    this.validateForm(this.goalForm);

    if (this.goalForm.valid) {
      this._goalService.createGoal(this.goalForm.value).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((newGoal) => {
        this.goals.push(newGoal);
        this._notificationService.pushSuccess("Cel dodany pomyślnie.");
      }, error => {
        this._notificationService.pushError('Wystąpił błąd podczas dodawania celu.');
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public addProgress(): void {
    this.validateForm(this.progressForm);

    if (this.progressForm.valid) {
      const formValue = { ...this.progressForm.value, goalId: this.pickedGoalIdToAddProgress };
      const goalIndex = this.goals.findIndex(goal => goal.id === this.pickedGoalIdToAddProgress);

      this._progressService.addProgress(formValue).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((newProgress) => {
        this.goals[goalIndex].progressList.push(newProgress);
        this._notificationService.pushSuccess("Progres dodany pomyślnie.");
      }, error => {
        this._notificationService.pushError('Wystąpił błąd podczas dodawania progresu.');
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public addTask(): void {
    this.validateForm(this.taskForm);

    if (this.taskForm.valid) {
      const formValue = { ...this.taskForm.value, relatedTagsOrCategories: this.taskForm.value.relatedTagsOrCategories.split(',').map(tag => tag.trim()) };

      this._taskService.createTask(formValue).pipe(finalize(() => {
        this._cdr.detectChanges();
      })).subscribe((newTask) => {
        this.tasks.push(newTask);
        this._notificationService.pushSuccess("Zadanie dodane pomyślnie.");
      }, error => {
        this._notificationService.pushError('Wystąpił błąd podczas dodawania zadania.');
      });
    } else {
      this._notificationService.pushError('Formularz jest nieprawidłowy. Proszę wypełnić wszystkie wymagane pola poprawnie.');
    }
  }

  public toggleNotification(eventId: number): void {
    this._calendarService.toggleNotification(eventId).subscribe(response => {
      this._notificationService.pushSuccess('Status powiadomień dla tego wydarzenia zmieniony.');
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas zmiany statusu powiadomień.');
    });
  }

  public editTask(): void {
    const formValue = { ...this.taskForm.value, relatedTagsOrCategories: this.taskForm.value.relatedTagsOrCategories.split(',').map(tag => tag.trim()) };

    this._taskService.updateTask(this.editingTask.id, formValue).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe((res) => {
      const updatedIndex = this.tasks.findIndex(task => task.id === res.id);
      if (updatedIndex !== -1) {
        this.tasks[updatedIndex] = res;
      }
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas edytowania zadania.');
    });
  }

  public editGoal(): void {
    this._goalService.updateGoal(this.editingGoal.id, this.goalForm.value).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe((res) => {
      const updatedIndex = this.goals.findIndex(goal => goal.id === res.id);
      if (updatedIndex !== -1) {
        this.goals[updatedIndex] = { ...res, progressList: this.goals[updatedIndex].progressList };
      }
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas edytowania celu.');
    });
  }

  public deleteEvent(eventId: number): void {
    this._calendarService.deleteEvent(eventId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe(res => {
      this._notificationService.pushSuccess('Wydarzenie usunięte pomyślnie.');
      this.removeElementFromList(this.calendarEvents, eventId);
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas usuwania wydarzenia.');
    });
  }

  public deleteProgress(goalId: number, progressId: number): void {
    const goal = this.goals.find(item => item.id === goalId);

    this._progressService.deleteProgress(progressId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe(res => {
      this._notificationService.pushSuccess('Progres usunięte pomyślnie.');
      this.removeElementFromList(goal.progressList, progressId);
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas usuwania progresu.');
    });
  }

  public deleteTask(taskId: number): void {
    this._taskService.deleteTask(taskId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe(res => {
      this._notificationService.pushSuccess('Zadanie usunięte pomyślnie.');
      this.removeElementFromList(this.tasks, taskId);
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas usuwania zadania.');
    });
  }

  public deleteGoal(goalId: number): void {
    this._goalService.deleteGoal(goalId).pipe(finalize(() => {
      this._cdr.detectChanges();
    })).subscribe(res => {
      this._notificationService.pushSuccess('Zadanie usunięte pomyślnie.');
      this.removeElementFromList(this.goals, goalId);
    }, error => {
      this._notificationService.pushError('Wystąpił błąd podczas usuwania zadania.');
    });
  }

  private removeElementFromList(list: any[], eventId: number): void {
    const index = list.findIndex(event => event.id === eventId);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }
}
