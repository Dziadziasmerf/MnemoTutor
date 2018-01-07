import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authenticationUrl = 'http://localhost:8080/authentication';

  constructor(private http: HttpClient) { }
  public login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<AuthenticationResponse>(this.authenticationUrl + '/token',
      JSON.stringify({username: username, password: password}),
      {headers: headers});
  }
  public getToken(): String {
    const currentUserItem = localStorage.getItem('currentUser') ;
    const currentUser = currentUserItem && currentUserItem !== '' ? JSON.parse(currentUserItem) : undefined;
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
  }

  public getUserLogin(): string {
    const token = this.getToken();
    if (token) {
      const byteTokenData = token.split('.')[1];
      const tokenData = atob(byteTokenData);
      return JSON.parse(tokenData).sub;
    }
    return '';
  }

}


interface AuthenticationResponse {
  token: string;
  username: string;
}
