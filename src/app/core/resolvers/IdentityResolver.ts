import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IdentityService } from "../../auth/core/services/IdentityService";
import { IAuthenticationResponse } from "../../auth/core/interfaces/IAuthenticationResponse";

@Injectable()
export class IdentityResolver implements Resolve<IAuthenticationResponse> {
  constructor(
    public readonly _identityService: IdentityService
  ) {}

  public resolve(): IAuthenticationResponse {
    return this._identityService.identity;
  }
}
