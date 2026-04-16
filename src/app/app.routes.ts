import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'flights',
    loadComponent: () => import('./features/flights/flight-list').then(m => m.FlightList)
  },
  {
    path: 'booking/:id',
    loadComponent: () => import('./features/booking/booking-flow').then(m => m.BookingFlow)
  },
  {
    path: 'check-in',
    loadComponent: () => import('./features/check-in/check-in').then(m => m.CheckIn)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
