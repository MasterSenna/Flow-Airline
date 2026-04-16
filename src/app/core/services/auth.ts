import { Injectable, signal } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSignal = signal<User | null>({
    id: 'user_1',
    name: 'Felipe Sena',
    email: 'lipesena800@gmail.com',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  });

  user = this.userSignal.asReadonly();

  logout() {
    this.userSignal.set(null);
  }
}
