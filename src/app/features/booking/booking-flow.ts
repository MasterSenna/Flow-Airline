import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../core/services/flight';
import { BookingService } from '../../core/services/booking';
import { AuthService } from '../../core/services/auth';
import { Flight } from '../../core/models';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-flow',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        @if (loading()) {
          <div class="flex flex-col items-center justify-center h-64">
            <div class="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-slate-500 font-medium">Preparando sua reserva...</p>
          </div>
        } @else if (flight(); as f) {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="md:col-span-2 space-y-8">
              <h2 class="text-3xl font-display font-bold text-primary">Finalizar Reserva</h2>
              
              <!-- Passenger Info -->
              <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                    <mat-icon>person</mat-icon>
                  </div>
                  <h3 class="text-xl font-display font-bold text-primary">Informações do Passageiro</h3>
                </div>
                
                <div class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label for="passengerName" class="text-xs font-bold text-slate-400 uppercase">Nome Completo</label>
                      <input id="passengerName" type="text" [(ngModel)]="passengerName" placeholder="Como no documento" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-accent outline-none">
                    </div>
                    <div class="space-y-1">
                      <label for="passengerEmail" class="text-xs font-bold text-slate-400 uppercase">E-mail</label>
                      <input id="passengerEmail" type="email" [value]="auth.user()?.email" disabled class="w-full px-4 py-3 bg-slate-100 border border-slate-100 rounded-xl text-slate-500">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Payment Simulation -->
              <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <mat-icon>payments</mat-icon>
                  </div>
                  <h3 class="text-xl font-display font-bold text-primary">Pagamento</h3>
                </div>
                <p class="text-slate-500 text-sm mb-6">Esta é uma simulação. Nenhum valor real será cobrado do seu cartão.</p>
                
                <div class="grid grid-cols-1 gap-4">
                  <div class="p-4 border-2 border-accent bg-accent/5 rounded-2xl flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <mat-icon class="text-accent">credit_card</mat-icon>
                      <div>
                        <p class="text-sm font-bold text-primary">Cartão Final 4242</p>
                        <p class="text-xs text-slate-500">Expira em 12/28</p>
                      </div>
                    </div>
                    <mat-icon class="text-accent">check_circle</mat-icon>
                  </div>
                </div>
              </div>

              <button 
                (click)="confirmBooking()"
                [disabled]="!passengerName || processing()"
                class="w-full py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-accent/30 flex items-center justify-center gap-3"
              >
                @if (processing()) {
                  <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                } @else {
                  Confirmar e Pagar R$ {{ f.price }}
                }
              </button>
            </div>

            <!-- Summary Sidebar -->
            <div class="md:col-span-1">
              <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
                <h3 class="font-display font-bold text-primary mb-6">Resumo da Viagem</h3>
                
                <div class="space-y-6">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="text-xs font-bold text-slate-400 uppercase">{{ f.originCode }}</p>
                      <p class="text-sm font-bold text-primary">{{ f.origin }}</p>
                    </div>
                    <mat-icon class="text-slate-300 scale-75">flight_takeoff</mat-icon>
                    <div class="text-right">
                      <p class="text-xs font-bold text-slate-400 uppercase">{{ f.destinationCode }}</p>
                      <p class="text-sm font-bold text-primary">{{ f.destination }}</p>
                    </div>
                  </div>

                  <div class="pt-6 border-t border-slate-100 space-y-3">
                    <div class="flex justify-between text-sm">
                      <span class="text-slate-500">Tarifa Adulto</span>
                      <span class="font-bold text-primary">R$ {{ f.price }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-slate-500">Taxas de embarque</span>
                      <span class="font-bold text-primary">R$ 0,00</span>
                    </div>
                    <div class="flex justify-between pt-3 border-t border-slate-100">
                      <span class="font-display font-bold text-primary">Total</span>
                      <span class="font-display font-bold text-accent text-xl">R$ {{ f.price }}</span>
                    </div>
                  </div>
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
export class BookingFlow implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private flightService = inject(FlightService);
  private bookingService = inject(BookingService);
  auth = inject(AuthService);

  flight = signal<Flight | null>(null);
  loading = signal(true);
  processing = signal(false);
  passengerName = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.flightService.getFlightById(id).subscribe(f => {
        if (f) this.flight.set(f);
        this.loading.set(false);
      });
    }
    
    if (this.auth.user()) {
      this.passengerName = this.auth.user()?.name || '';
    }
  }

  confirmBooking() {
    const f = this.flight();
    if (!f) return;

    this.processing.set(true);
    this.bookingService.createBooking(f, this.passengerName).subscribe(() => {
      this.processing.set(false);
      this.router.navigate(['/dashboard']);
    });
  }
}
