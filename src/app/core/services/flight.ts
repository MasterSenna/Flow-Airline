import { Injectable } from '@angular/core';
import { Flight } from '../models';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private mockFlights: Flight[] = [
    {
      id: '1',
      origin: 'São Paulo',
      originCode: 'GRU',
      destination: 'Rio de Janeiro',
      destinationCode: 'GIG',
      departureTime: new Date(Date.now() + 86400000),
      arrivalTime: new Date(Date.now() + 86400000 + 3600000),
      price: 250,
      airline: 'SkyFlow Airlines',
      flightNumber: 'SF101',
      duration: '1h 00m'
    },
    {
      id: '2',
      origin: 'São Paulo',
      originCode: 'CGH',
      destination: 'Brasília',
      destinationCode: 'BSB',
      departureTime: new Date(Date.now() + 172800000),
      arrivalTime: new Date(Date.now() + 172800000 + 5400000),
      price: 450,
      airline: 'SkyFlow Airlines',
      flightNumber: 'SF202',
      duration: '1h 30m'
    },
    {
      id: '3',
      origin: 'Lisboa',
      originCode: 'LIS',
      destination: 'Paris',
      destinationCode: 'CDG',
      departureTime: new Date(Date.now() + 259200000),
      arrivalTime: new Date(Date.now() + 259200000 + 9000000),
      price: 120,
      airline: 'SkyFlow Euro',
      flightNumber: 'SF303',
      duration: '2h 30m'
    },
    {
      id: '4',
      origin: 'New York',
      originCode: 'JFK',
      destination: 'London',
      destinationCode: 'LHR',
      departureTime: new Date(Date.now() + 345600000),
      arrivalTime: new Date(Date.now() + 345600000 + 25200000),
      price: 850,
      airline: 'SkyFlow Transatlantic',
      flightNumber: 'SF404',
      duration: '7h 00m'
    }
  ];

  getFlights(origin?: string, destination?: string): Observable<Flight[]> {
    let filtered = this.mockFlights;
    if (origin) {
      filtered = filtered.filter(f => f.origin.toLowerCase().includes(origin.toLowerCase()) || f.originCode.toLowerCase().includes(origin.toLowerCase()));
    }
    if (destination) {
      filtered = filtered.filter(f => f.destination.toLowerCase().includes(destination.toLowerCase()) || f.destinationCode.toLowerCase().includes(destination.toLowerCase()));
    }
    return of(filtered).pipe(delay(800)); // Simulate network delay
  }

  getFlightById(id: string): Observable<Flight | undefined> {
    return of(this.mockFlights.find(f => f.id === id)).pipe(delay(400));
  }
}
