import { Injectable } from '@angular/core';
import { AbstractBaseStorage } from "./AbstractBaseStorage";

@Injectable({
  providedIn: 'root'
})
export class SessionStorage extends AbstractBaseStorage {

  protected override storage = sessionStorage;
}
