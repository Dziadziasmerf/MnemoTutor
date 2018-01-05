import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  public isUsernameTaken(username: string) {
    return this.http.head(this.baseUrl + '/' + username);
  }

  public addUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }


}

export class User {
  username: string;
  email: string;
  password: string;
}
