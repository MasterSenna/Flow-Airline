import { Injectable, signal, computed } from '@angular/core';
import { Booking, Flight } from '../models';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsSignal = signal<Booking[]>(this.loadFromStorage());

  bookings = computed(() => this.bookingsSignal());

  private loadFromStorage(): Booking[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('skyflow_bookings');
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(bookings: Booking[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('skyflow_bookings', JSON.stringify(bookings));
  }

  createBooking(flight: Flight, passengerName: string): Observable<Booking> {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      flight,
      passengerName,
      status: 'confirmed',
      bookingDate: new Date()
    };

    this.bookingsSignal.update(b => {
      const updated = [...b, newBooking];
      this.saveToStorage(updated);
      return updated;
    });

    return of(newBooking).pipe(delay(1000));
  }

  updateBooking(booking: Booking): void {
    this.bookingsSignal.update(bookings => {
      const updated = bookings.map(b => b.id === booking.id ? booking : b);
      this.saveToStorage(updated);
      return updated;
    });
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookingsSignal().find(b => b.id === id);
  }
}
