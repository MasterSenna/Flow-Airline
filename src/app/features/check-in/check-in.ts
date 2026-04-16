import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../../core/services/booking';
import { Booking } from '../../core/models';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        @if (!currentBooking()) {
          <div class="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <mat-icon class="text-3xl">assignment_turned_in</mat-icon>
              </div>
              <h2 class="text-2xl font-display font-bold text-primary">Fazer Check-in</h2>
              <p class="text-slate-500 text-sm">Insira o código da sua reserva para começar.</p>
            </div>

            <div class="space-y-4">
              <div class="space-y-1">
                <label for="bookingCode" class="text-xs font-bold text-slate-400 uppercase">Código da Reserva</label>
                <input 
                  id="bookingCode"
                  type="text" 
                  [(ngModel)]="bookingCode"
                  placeholder="Ex: ABC123" 
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-accent outline-none uppercase font-mono tracking-widest"
                >
              </div>
              <button 
                (click)="findBooking()"
                class="w-full py-4 bg-accent text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-accent/20"
              >
                Buscar Reserva
              </button>
              @if (error()) {
                <p class="text-red-500 text-xs font-medium text-center">{{ error() }}</p>
              }
            </div>
          </div>
        } @else {
          <div class="space-y-8">
            <div class="flex items-center justify-between">
              <h2 class="text-3xl font-display font-bold text-primary">Escolha seu Assento</h2>
              <button (click)="currentBooking.set(null)" class="text-slate-400 hover:text-primary flex items-center gap-1 text-sm font-medium">
                <mat-icon class="scale-75">arrow_back</mat-icon> Voltar
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Seat Map -->
              <div class="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
                <div class="min-w-[300px] flex flex-col items-center">
                  <div class="w-full h-12 bg-slate-100 rounded-t-full mb-12 flex items-center justify-center">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frente da Aeronave</span>
                  </div>

                  <div class="grid grid-cols-7 gap-3">
                    @for (row of rows; track row) {
                      <!-- Left Seats -->
                      <div class="flex gap-2">
                        @for (seat of ['A', 'B', 'C']; track seat) {
                          <button 
                            (click)="selectSeat(row + seat)"
                            [class.bg-accent]="selectedSeat() === row + seat"
                            [class.text-white]="selectedSeat() === row + seat"
                            [class.bg-slate-50]="selectedSeat() !== row + seat"
                            [class.text-slate-400]="selectedSeat() !== row + seat"
                            class="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-accent/20 transition-colors border border-slate-100"
                          >
                            {{ row }}{{ seat }}
                          </button>
                        }
                      </div>

                      <!-- Aisle -->
                      <div class="flex items-center justify-center text-[10px] font-bold text-slate-300">
                        {{ row }}
                      </div>

                      <!-- Right Seats -->
                      <div class="flex gap-2">
                        @for (seat of ['D', 'E', 'F']; track seat) {
                          <button 
                            (click)="selectSeat(row + seat)"
                            [class.bg-accent]="selectedSeat() === row + seat"
                            [class.text-white]="selectedSeat() === row + seat"
                            [class.bg-slate-50]="selectedSeat() !== row + seat"
                            [class.text-slate-400]="selectedSeat() !== row + seat"
                            class="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-accent/20 transition-colors border border-slate-100"
                          >
                            {{ row }}{{ seat }}
                          </button>
                        }
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Selection Summary -->
              <div class="lg:col-span-1 space-y-6">
                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 class="font-display font-bold text-primary mb-6">Sua Seleção</h3>
                  
                  <div class="space-y-4">
                    <div class="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span class="text-sm text-slate-500">Assento Selecionado</span>
                      <span class="text-xl font-display font-bold text-accent">{{ selectedSeat() || '--' }}</span>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-xs text-slate-500">
                        <div class="w-3 h-3 bg-accent rounded-sm"></div> Selecionado
                      </div>
                      <div class="flex items-center gap-2 text-xs text-slate-500">
                        <div class="w-3 h-3 bg-slate-50 border border-slate-100 rounded-sm"></div> Disponível
                      </div>
                      <div class="flex items-center gap-2 text-xs text-slate-500">
                        <div class="w-3 h-3 bg-slate-200 rounded-sm"></div> Ocupado
                      </div>
                    </div>
                  </div>

                  <button 
                    (click)="confirmCheckIn()"
                    [disabled]="!selectedSeat() || processing()"
                    class="w-full mt-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    @if (processing()) {
                      <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    } @else {
                      <mat-icon>check_circle</mat-icon> Concluir Check-in
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class CheckIn {
  private bookingService = inject(BookingService);

  bookingCode = '';
  currentBooking = signal<Booking | null>(null);
  selectedSeat = signal<string | null>(null);
  error = signal('');
  processing = signal(false);

  rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  findBooking() {
    this.error.set('');
    const booking = this.bookingService.getBookingById(this.bookingCode);
    if (booking) {
      this.currentBooking.set(booking);
      this.selectedSeat.set(booking.seatNumber || null);
    } else {
      this.error.set('Reserva não encontrada. Verifique o código.');
    }
  }

  selectSeat(seat: string) {
    this.selectedSeat.set(seat);
  }

  confirmCheckIn() {
    const booking = this.currentBooking();
    const seat = this.selectedSeat();
    if (!booking || !seat) return;

    this.processing.set(true);
    setTimeout(() => {
      this.bookingService.updateBooking({
        ...booking,
        seatNumber: seat,
        status: 'checked-in'
      });
      this.processing.set(false);
      this.currentBooking.set(null);
      this.bookingCode = '';
      this.selectedSeat.set(null);
      alert('Check-in realizado com sucesso!');
    }, 1500);
  }
}
