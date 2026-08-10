import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../login/service/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

interface Usuario {
  nomeusu: string | null;
}

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  usuario?: Usuario;

  constructor(
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.obterDadosUsuario();
  }

  async obterDadosUsuario(): Promise<void> {
    const login = this.authService.usuarioAtual();
    console.log('Login atual da sessão:', login);
    {
      if (login) {
        const dados = await this.authService.obterDadosCompletosUsuario(login);
        console.log('Dados do Firestore:', dados);

        this.usuario = {
          nomeusu: dados?.nomeusu || login,
        };

        this.cdr.detectChanges();
      }
    }
  }

  sair() {
    this.authService.fazerLogout();
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
