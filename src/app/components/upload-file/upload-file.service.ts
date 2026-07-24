import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private readonly CLOUD_NAME = 'cyi5pmjg';
  private readonly UPLOAD_PRESET = 'tlnpeq4i';

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<any> {
    const file = files[0];
    const resourceType = this.getResourceType(file);

    // Define a rota dinâmica para a API do Cloudinary baseada no tipo do arquivo
    const url = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/${resourceType}/upload`;

    const formData = new FormData();
    // O 3º argumento (file.name) garante a extensão (.jpg, .mp3, .pdf) no Cloudinary
    formData.append('file', file, file.name);
    formData.append('upload_preset', this.UPLOAD_PRESET);
    formData.append('folder', 'angular_uploads');

    return this.http.post(url, formData);
  }

  // Identifica o endpoint exato do Cloudinary
  private getResourceType(file: File): 'image' | 'video' | 'raw' {
    const mimeType = file.type.toLowerCase();

    if (mimeType.startsWith('image/')) {
      return 'image';
    }
    if (mimeType.startsWith('video/') || mimeType.startsWith('audio/')) {
      // Áudios (.mp3, .wav) e vídeos usam a rota 'video' no Cloudinary
      return 'video';
    }
    // Arquivos como PDF, ZIP, DOCX usam a rota 'raw'
    return 'raw';
  }
}
