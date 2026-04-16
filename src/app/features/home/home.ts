import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  template: `
    <div class="relative">
      <!-- Hero Section -->
      <div class="relative h-[600px] flex items-center overflow-hidden">
        <img src="https://picsum.photos/seed/airline/1920/1080" alt="Hero Background" class="absolute inset-0 w-full h-full object-cover brightness-50" referrerpolicy="no-referrer">
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="max-w-2xl">
            <h1 class="text-5xl md:text-6xl text-white mb-6 leading-tight">
              Explore o mundo com <span class="text-accent">conforto</span> e <span class="text-accent">segurança</span>.
            </h1>
            <p class="text-xl text-slate-200 mb-10">Encontre as melhores ofertas para sua próxima aventura. Voos diretos para mais de 150 destinos.</p>
          </div>

          <!-- Search Card -->
          <div class="bg-white p-6 rounded-3xl shadow-2xl shadow-black/20 -mb-32 relative z-10">
            <div class="flex flex-wrap gap-4 mb-6">
              <button class="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                <mat-icon class="scale-75">flight</mat-icon> Ida e Volta
              </button>
              <button class="flex items-center gap-2 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-full text-sm font-semibold transition-colors">
                <mat-icon class="scale-75">person</mat-icon> 1 Passageiro
              </button>
              <button class="flex items-center gap-2 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-full text-sm font-semibold transition-colors">
                <mat-icon class="scale-75">airline_seat_recline_extra</mat-icon> Econômica
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="relative group">
                <label for="originInput" class="absolute left-4 top-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origem</label>
                <input 
                  id="originInput"
                  type="text" 
                  [(ngModel)]="origin"
                  placeholder="De onde você sai?" 
                  class="w-full pt-8 pb-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all group-hover:bg-white group-hover:border-slate-200"
                >
                <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">location_on</mat-icon>
              </div>

              <div class="relative group">
                <label for="destinationInput" class="absolute left-4 top-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destino</label>
                <input 
                  id="destinationInput"
                  type="text" 
                  [(ngModel)]="destination"
                  placeholder="Para onde você vai?" 
                  class="w-full pt-8 pb-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all group-hover:bg-white group-hover:border-slate-200"
                >
                <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">flight_land</mat-icon>
              </div>

              <div class="relative group">
                <label for="dateInput" class="absolute left-4 top-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data</label>
                <input 
                  id="dateInput"
                  type="date" 
                  class="w-full pt-8 pb-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all group-hover:bg-white group-hover:border-slate-200"
                >
              </div>

              <button 
                (click)="search()"
                class="bg-accent text-white rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/30 active:scale-95"
              >
                <mat-icon>search</mat-icon> Buscar Voos
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Destinations -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl text-primary mb-2">Destinos em Destaque</h2>
            <p class="text-slate-500">As melhores ofertas selecionadas para você.</p>
          </div>
          <button class="text-accent font-semibold hover:underline">Ver todos</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (dest of destinations; track dest.name) {
            <div class="group cursor-pointer">
              <div class="relative h-80 rounded-3xl overflow-hidden mb-4">
                <img [src]="dest.image" [alt]="dest.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-6 left-6 text-white">
                  <p class="text-sm font-medium opacity-80 mb-1">{{ dest.country }}</p>
                  <h3 class="text-2xl font-display font-bold">{{ dest.name }}</h3>
                </div>
                <div class="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                  A partir de R$ {{ dest.price }}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Home {
  private router = inject(Router);
  
  origin = '';
  destination = '';

  destinations = [
    { name: 'Rio de Janeiro', country: 'Brasil', price: 250, image: 'https://picsum.photos/seed/rio/600/800' },
    { name: 'Paris', country: 'França', price: 2450, image: 'https://picsum.photos/seed/paris/600/800' },
    { name: 'New York', country: 'EUA', price: 3100, image: 'https://picsum.photos/seed/nyc/600/800' }
  ];

  search() {
    this.router.navigate(['/flights'], { 
      queryParams: { 
        origin: this.origin, 
        destination: this.destination 
      } 
    });
  }
}
