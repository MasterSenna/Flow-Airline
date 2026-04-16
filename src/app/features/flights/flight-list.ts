import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlightService } from '../../core/services/flight';
import { Flight } from '../../core/models';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <div class="bg-slate-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Search Info Header -->
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center justify-between gap-6">
          <div class="flex items-center gap-6">
            <div class="flex flex-col">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origem</span>
              <span class="text-lg font-display font-bold text-primary">{{ origin() || 'Qualquer lugar' }}</span>
            </div>
            <mat-icon class="text-slate-300">arrow_forward</mat-icon>
            <div class="flex flex-col">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destino</span>
              <span class="text-lg font-display font-bold text-primary">{{ destination() || 'Qualquer lugar' }}</span>
            </div>
          </div>
          
          <div class="flex gap-4">
            <div class="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
              <mat-icon class="text-slate-400 scale-75">calendar_today</mat-icon>
              <span class="text-sm font-medium text-slate-600">15 Abr - 22 Abr</span>
            </div>
            <button class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">Alterar</button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Filters Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 class="font-display font-bold text-primary mb-6 flex items-center gap-2">
                <mat-icon class="scale-75">filter_list</mat-icon> Filtros
              </h3>
              
              <div class="space-y-6">
                <div>
                  <label for="stopsFilter" class="text-xs font-bold text-slate-400 uppercase mb-3 block">Escalas</label>
                  <div id="stopsFilter" class="space-y-2">
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" class="w-5 h-5 rounded-md border-slate-200 text-accent focus:ring-accent">
                      <span class="text-sm text-slate-600 group-hover:text-primary transition-colors">Direto</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" class="w-5 h-5 rounded-md border-slate-200 text-accent focus:ring-accent">
                      <span class="text-sm text-slate-600 group-hover:text-primary transition-colors">1 Parada</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label for="priceFilter" class="text-xs font-bold text-slate-400 uppercase mb-3 block">Preço Máximo</label>
                  <input id="priceFilter" type="range" class="w-full accent-accent">
                  <div class="flex justify-between text-xs text-slate-400 mt-2">
                    <span>R$ 100</span>
                    <span>R$ 5000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Results List -->
          <div class="lg:col-span-3 space-y-4">
            @if (loading()) {
              @for (i of [1,2,3]; track i) {
                <div class="bg-white p-8 rounded-3xl border border-slate-100 animate-pulse">
                  <div class="h-12 bg-slate-100 rounded-xl mb-4"></div>
                  <div class="h-6 bg-slate-50 rounded-lg w-1/2"></div>
                </div>
              }
            } @else if (flights().length === 0) {
              <div class="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <mat-icon class="text-slate-200 text-6xl mb-4">sentiment_dissatisfied</mat-icon>
                <h3 class="text-xl font-display font-bold text-primary mb-2">Nenhum voo encontrado</h3>
                <p class="text-slate-500">Tente alterar os filtros ou os locais de busca.</p>
              </div>
            } @else {
              @for (flight of flights(); track flight.id) {
                <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                  <div class="flex flex-col sm:flex-row items-center justify-between gap-8">
                    <!-- Airline Info -->
                    <div class="flex items-center gap-4 w-full sm:w-auto">
                      <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-accent">
                        <mat-icon>flight</mat-icon>
                      </div>
                      <div>
                        <h4 class="font-display font-bold text-primary">{{ flight.airline }}</h4>
                        <p class="text-xs text-slate-400 font-medium">{{ flight.flightNumber }}</p>
                      </div>
                    </div>

                    <!-- Flight Path -->
                    <div class="flex-grow flex items-center justify-center gap-4 sm:gap-8 w-full sm:w-auto">
                      <div class="text-center">
                        <span class="text-2xl font-display font-bold text-primary">{{ flight.departureTime | date:'HH:mm' }}</span>
                        <p class="text-xs font-bold text-slate-400">{{ flight.originCode }}</p>
                      </div>
                      
                      <div class="flex-grow max-w-[120px] flex flex-col items-center gap-1">
                        <span class="text-[10px] font-bold text-slate-300 uppercase">{{ flight.duration }}</span>
                        <div class="w-full h-[2px] bg-slate-100 relative">
                          <div class="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-200"></div>
                          <div class="absolute -top-1 right-0 w-2 h-2 rounded-full bg-slate-200"></div>
                          <mat-icon class="absolute -top-3 left-1/2 -translate-x-1/2 text-accent scale-75">flight_takeoff</mat-icon>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-500 uppercase">Direto</span>
                      </div>

                      <div class="text-center">
                        <span class="text-2xl font-display font-bold text-primary">{{ flight.arrivalTime | date:'HH:mm' }}</span>
                        <p class="text-xs font-bold text-slate-400">{{ flight.destinationCode }}</p>
                      </div>
                    </div>

                    <!-- Price & Action -->
                    <div class="text-right w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                      <p class="text-xs font-bold text-slate-400 uppercase mb-1">Por pessoa</p>
                      <h3 class="text-3xl font-display font-bold text-primary mb-4">R$ {{ flight.price }}</h3>
                      <a 
                        [routerLink]="['/booking', flight.id]"
                        class="block w-full sm:w-auto px-8 py-3 bg-accent text-white rounded-2xl font-bold hover:bg-blue-600 transition-all text-center shadow-lg shadow-accent/20"
                      >
                        Selecionar
                      </a>
                    </div>
                  </div>
                </div>
              }
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
export class FlightList implements OnInit {
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);

  origin = signal('');
  destination = signal('');
  flights = signal<Flight[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.origin.set(params['origin'] || '');
      this.destination.set(params['destination'] || '');
      this.loadFlights();
    });
  }

  loadFlights() {
    this.loading.set(true);
    this.flightService.getFlights(this.origin(), this.destination()).subscribe(data => {
      this.flights.set(data);
      this.loading.set(false);
    });
  }
}
