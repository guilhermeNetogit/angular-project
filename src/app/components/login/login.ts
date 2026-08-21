import { inject } from '@angular/core';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './service/auth.service';
import { User } from './user';
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  user: User = {login: '', senha: ''};
  hide = signal(true);
  authService = inject(AuthService);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  fazerLogin(form: NgForm): void {
  if (form.invalid) {
    return;
  }

  this.authService.fazerLogin(this.user);
}
}
