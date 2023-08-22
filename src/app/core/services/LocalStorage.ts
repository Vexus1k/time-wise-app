import { Injectable } from '@angular/core';
import { AbstractBaseStorage } from "./AbstractBaseStorage";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends AbstractBaseStorage {

  protected override readonly storage = localStorage;
}
