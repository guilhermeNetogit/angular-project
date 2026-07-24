import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadFileService } from './upload-file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.scss',
})
export class UploadFileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fileName: string = '';
  arquivosSelecionados: File[] = [];

  progress: number = 0;
  isUploading: boolean = false;

  constructor(
    private service: UploadFileService,
    private cdr: ChangeDetectorRef,
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.arquivosSelecionados = Array.from(input.files);

      this.fileName =
        this.arquivosSelecionados.length === 1
          ? this.arquivosSelecionados[0].name
          : `${this.arquivosSelecionados.length} arquivos selecionados`;

      this.progress = 0;
      this.isUploading = false;
    }
  }

  onUpload() {
    if (this.arquivosSelecionados.length > 0) {
      this.isUploading = true;
      this.progress = 0;

      this.service.upload(this.arquivosSelecionados).subscribe({
        next: (event: any) => {
          // Atualiza a barra de progresso durante o envio
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
            this.cdr.detectChanges();
          }
          // Dispara quando o Cloudinary devolve a resposta final de sucesso
          else if (event.type === HttpEventType.Response) {
            this.progress = 100;
            this.cdr.detectChanges();

            console.log('Upload concluído com sucesso no servidor:', event.body);

            setTimeout(() => {
              alert('Upload concluído com sucesso!');
              this.limparFormulario(); // Limpa o formulário DEPOIS do alerta
            }, 100);
          }
        },
        error: (err: any) => {
          console.error('Erro ao realizar upload:', err);
          this.isUploading = false;
          this.cdr.detectChanges();
          alert('Falha no envio do arquivo.');
        },
      });
    }
  }

  limparFormulario() {
    this.arquivosSelecionados = [];
    this.fileName = '';
    this.progress = 0;
    this.isUploading = false;

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

    this.cdr.detectChanges();
  }
}
