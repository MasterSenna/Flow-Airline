import { Component, inject, computed } from '@angular/core';
import { BookingService } from '../../core/services/booking';
import { AuthService } from '../../core/services/auth';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row gap-8 items-start">
          
          <!-- User Profile Card -->
          <div class="w-full md:w-80 space-y-6">
            <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div class="relative inline-block mb-4">
                <img [src]="auth.user()?.avatar" alt="User Avatar" class="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-lg" referrerpolicy="no-referrer">
                <div class="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <h3 class="text-xl font-display font-bold text-primary">{{ auth.user()?.name }}</h3>
              <p class="text-sm text-slate-500 mb-6">{{ auth.user()?.email }}</p>
              
              <div class="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div class="text-center">
                  <p class="text-2xl font-display font-bold text-primary">{{ bookings().length }}</p>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Viagens</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-display font-bold text-accent">Gold</p>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                </div>
              </div>
            </div>

            <nav class="bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
              <a href="#" class="flex items-center gap-3 px-4 py-3 bg-accent/10 text-accent rounded-2xl font-bold text-sm">
                <mat-icon>flight</mat-icon> Minhas Viagens
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-medium text-sm transition-colors">
                <mat-icon>person</mat-icon> Perfil
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-medium text-sm transition-colors">
                <mat-icon>settings</mat-icon> Configurações
              </a>
              <button (click)="auth.logout()" class="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-medium text-sm transition-colors">
                <mat-icon>logout</mat-icon> Sair
              </button>
            </nav>
          </div>

          <!-- Bookings List -->
          <div class="flex-grow space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-display font-bold text-primary">Minhas Viagens</h2>
              <a routerLink="/flights" class="text-sm font-bold text-accent hover:underline">Nova Reserva</a>
            </div>

            @if (bookings().length === 0) {
              <div class="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <mat-icon class="text-slate-200 text-4xl">flight_takeoff</mat-icon>
                </div>
                <h3 class="text-xl font-display font-bold text-primary mb-2">Você ainda não tem viagens</h3>
                <p class="text-slate-500 mb-8">Que tal começar a planejar sua próxima aventura hoje?</p>
                <a routerLink="/flights" class="inline-block px-8 py-3 bg-accent text-white rounded-2xl font-bold shadow-lg shadow-accent/20">Buscar Voos</a>
              </div>
            } @else {
              <div class="space-y-4">
                @for (booking of bookings(); track booking.id) {
                  <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex flex-wrap items-center justify-between gap-6">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-accent">
                          <mat-icon>flight</mat-icon>
                        </div>
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="text-sm font-bold text-primary">{{ booking.flight.originCode }}</span>
                            <mat-icon class="text-slate-300 scale-50">arrow_forward</mat-icon>
                            <span class="text-sm font-bold text-primary">{{ booking.flight.destinationCode }}</span>
                          </div>
                          <p class="text-xs text-slate-400">{{ booking.flight.departureTime | date:'dd MMM, yyyy' }}</p>
                        </div>
                      </div>

                      <div class="hidden sm:block">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Código</p>
                        <p class="text-sm font-mono font-bold text-primary">{{ booking.id.toUpperCase() }}</p>
                      </div>

                      <div class="hidden sm:block">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assento</p>
                        <p class="text-sm font-bold text-primary">{{ booking.seatNumber || '--' }}</p>
                      </div>

                      <div>
                        <span 
                          [class.bg-emerald-100]="booking.status === 'checked-in'"
                          [class.text-emerald-600]="booking.status === 'checked-in'"
                          [class.bg-blue-100]="booking.status === 'confirmed'"
                          [class.text-blue-600]="booking.status === 'confirmed'"
                          class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        >
                          {{ booking.status === 'checked-in' ? 'Check-in Realizado' : 'Confirmado' }}
                        </span>
                      </div>

                      <div class="flex gap-2">
                        @if (booking.status === 'confirmed') {
                          <a routerLink="/check-in" class="px-4 py-2 bg-accent text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors">Check-in</a>
                        }
                        <button class="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                          <mat-icon class="scale-75">more_vert</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Dashboard {
  private bookingService = inject(BookingService);
  auth = inject(AuthService);

  bookings = computed(() => this.bookingService.bookings());
}
