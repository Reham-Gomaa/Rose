import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';
import {
  AuthResponse,
  AdaptedAuthResponse,
} from '../interface/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIAdaptorService
  implements Adaptor<AuthResponse, AdaptedAuthResponse>
{
  adapt(data: AuthResponse): AdaptedAuthResponse {
    return {
      message: data.message,
      token: data.token,
      userEmail: data.user?.email || '',
    };
  }
}
