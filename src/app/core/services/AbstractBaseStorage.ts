import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractBaseStorage {

  protected abstract readonly storage: Storage;

  public getItem(key: string): any {
    const val = this.storage.getItem(key);

    return val ? JSON.parse(val) : null;
  }

  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
