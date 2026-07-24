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
      this.progress = 10; // Já inicia a barra para o usuário ver o feedback visual
      this.cdr.detectChanges();

      this.service.upload(this.arquivosSelecionados).subscribe({
        next: (event: any) => {
          // Se for evento de progresso do Angular
          if (event?.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
            this.cdr.detectChanges();
          }
          // Se o evento final chegou (Response de sucesso ou se veio qualquer body com url/public_id do Cloudinary)
          else if (
            event?.type === HttpEventType.Response ||
            event?.body ||
            event?.public_id ||
            event?.secure_url
          ) {
            this.progress = 100;
            this.cdr.detectChanges();

            console.log('Upload concluído no Cloudinary:', event);

            setTimeout(() => {
              alert('Upload concluído com sucesso!');
              this.limparFormulario();
            }, 150);
          }
        },
        error: (err: any) => {
          console.error('Erro ao realizar upload:', err);
          this.isUploading = false;
          this.progress = 0;
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
