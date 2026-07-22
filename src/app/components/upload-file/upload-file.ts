import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UploadFileService } from './upload-file.service';
import { HttpEventType } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filterReponse, uploadProgress } from '../../shared/rxjs-operators';

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

      this.service
        .upload(this.arquivosSelecionados, '/api/upload')
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
            this.cdr.detectChanges();
          }),
          filterReponse(),
        )
        .subscribe({
          next: (responseBody) => {
            console.log('Upload concluído no servidor!', responseBody);

            this.limparFormulario();

            setTimeout(() => {
              alert('Upload concluído com sucesso!');
            }, 50);
          },
          error: (err) => {
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

    // Zera o valor do input nativo do HTML para liberar o campo
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

    this.cdr.detectChanges();
  }
}
