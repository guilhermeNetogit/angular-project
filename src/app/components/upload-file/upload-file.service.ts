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

    // Define a URL dinâmica baseada no tipo real do arquivo (image, video ou raw)
    const url = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('upload_preset', this.UPLOAD_PRESET);
    formData.append('folder', 'angular_uploads');

    return this.http.post(url, formData);
  }

  // Função auxiliar para determinar a rota correta do Cloudinary
  private getResourceType(file: File): 'image' | 'video' | 'raw' {
    const mimeType = file.type.toLowerCase();

    if (mimeType.startsWith('image/')) {
      return 'image';
    }
    if (mimeType.startsWith('video/') || mimeType.startsWith('audio/')) {
      // Vídeos e áudios (MP3, WAV, MP4) usam o endpoint 'video'
      return 'video';
    }
    // PDFs, ZIPs, DOCX e demais arquivos usam 'raw'
    return 'raw';
  }
}
