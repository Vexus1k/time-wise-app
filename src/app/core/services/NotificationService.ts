import { Injectable } from "@angular/core";
import { NotifierService } from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly _notifierService: NotifierService
  ) {}

  public pushSuccess(message?: string): void {
    return this._notifierService.notify('success', message);
  }

  public pushError(message?: string): void {
    return this._notifierService.notify('error', message);
  }

  public pushInfo(message?: string): void {
    return this._notifierService.notify('info', message);
  }

  public pushWarning(message?: string): void {
    return this._notifierService.notify('warning', message);
  }

  public pushDefault(message?: string): void {
    return this._notifierService.notify('default', message);
  }
}
