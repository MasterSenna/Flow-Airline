import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <div class="min-h-screen flex flex-col">
      <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <div class="flex items-center gap-8">
              <a routerLink="/" class="flex items-center gap-2 group">
                <div class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
                  <mat-icon>flight_takeoff</mat-icon>
                </div>
                <span class="text-xl font-display font-bold tracking-tight text-primary">SkyFlow</span>
              </a>
              
              <nav class="hidden md:flex items-center gap-1">
                <a routerLink="/flights" routerLinkActive="bg-slate-100 text-accent" class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Voos</a>
                <a routerLink="/check-in" routerLinkActive="bg-slate-100 text-accent" class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Check-in</a>
              </nav>
            </div>

            <div class="flex items-center gap-4">
              @if (auth.user()) {
                <a routerLink="/dashboard" class="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border border-slate-200 hover:border-accent transition-colors group">
                  <span class="text-sm font-medium text-slate-700 hidden sm:block">{{ auth.user()?.name }}</span>
                  <img [src]="auth.user()?.avatar" alt="User Avatar" class="w-8 h-8 rounded-full object-cover" referrerpolicy="no-referrer">
                </a>
              } @else {
                <button class="bg-primary text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">Entrar</button>
              }
            </div>
          </div>
        </div>
      </header>

      <main class="flex-grow">
        <ng-content></ng-content>
      </main>

      <footer class="bg-white border-t border-slate-200 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="col-span-1 md:col-span-2">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                  <mat-icon class="scale-75">flight_takeoff</mat-icon>
                </div>
                <span class="text-lg font-display font-bold text-primary">SkyFlow</span>
              </div>
              <p class="text-slate-500 text-sm max-w-xs">Sua jornada começa aqui. Tecnologia e conforto para levar você aos melhores destinos do mundo.</p>
            </div>
            <div>
              <h4 class="font-display font-bold text-primary mb-4">Links Úteis</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li><a href="#" class="hover:text-accent">Sobre nós</a></li>
                <li><a href="#" class="hover:text-accent">Carreiras</a></li>
                <li><a href="#" class="hover:text-accent">Termos de uso</a></li>
                <li><a href="#" class="hover:text-accent">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-display font-bold text-primary mb-4">Suporte</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li><a href="#" class="hover:text-accent">Central de Ajuda</a></li>
                <li><a href="#" class="hover:text-accent">Fale Conosco</a></li>
                <li><a href="#" class="hover:text-accent">Reembolsos</a></li>
                <li><a href="#" class="hover:text-accent">Status do Voo</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-slate-400 text-xs">© 2026 SkyFlow Airlines. Todos os direitos reservados.</p>
            <div class="flex gap-6">
              <mat-icon class="text-slate-400 hover:text-accent cursor-pointer">facebook</mat-icon>
              <mat-icon class="text-slate-400 hover:text-accent cursor-pointer">language</mat-icon>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Layout {
  auth = inject(AuthService);
}
