import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../login/service/auth.service';
import { Component, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly title = signal('angular-project');

  constructor (
    public authService: AuthService,
    private router: Router
  ) {}

  sair() {
    this.authService.fazerLogout();
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
