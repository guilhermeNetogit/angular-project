import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UploadFileService } from './upload-file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
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
    private cdr: ChangeDetectorRef) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.arquivosSelecionados = Array.from(input.files);

      this.fileName = this.arquivosSelecionados.length === 1
      ? this.arquivosSelecionados[0].name
      : `${this.arquivosSelecionados.length} arquivos selecionados`

      this.progress = 0;
      this.isUploading = false;
    }
  }

  onUpload() {
    if (this.arquivosSelecionados.length > 0) {
      this.isUploading = true;
      this.progress = 0;

      this.service.upload(this.arquivosSelecionados, '/api/upload').subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((event.loaded * 100) / event.total);
          } else if (event.type === HttpEventType.Response) {
            console.log('Upload concluído no servidor!');
          }
        },
        error: (err) => {
          console.error('Erro ao realizar upload:', err);
          this.isUploading = false;
          alert('Falha no envio do arquivo.');
        },
        complete: () => {
          this.isUploading = false;
          alert('Upload concluído com sucesso!');

          this.limparFormulario();
        }
      });
    }
  }

  limparFormulario() {
    this.arquivosSelecionados = [];
    this.fileName = '';
    this.progress = 0;

    // Zera o valor do input nativo do HTML para liberar o campo
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

    this.cdr.detectChanges();
  }
}
