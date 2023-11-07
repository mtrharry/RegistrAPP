import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  USER_KEY = 'user';
  constructor() { }

  saveUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
