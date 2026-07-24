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

    // Define a rota exata (image, video ou raw)
    const url = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);
    formData.append('folder', 'angular_uploads');

    return this.http.post(url, formData);
  }

  private getResourceType(file: File): 'image' | 'video' | 'raw' {
    const type = file.type.toLowerCase();

    if (type.startsWith('image/')) {
      return 'image';
    }
    if (type.startsWith('video/') || type.startsWith('audio/')) {
      return 'video'; // MP3, WAV e Vídeos usam o endpoint 'video'
    }
    return 'raw'; // PDF, ZIP e outros documentos
  }
}
