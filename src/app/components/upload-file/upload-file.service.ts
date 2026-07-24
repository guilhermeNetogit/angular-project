import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private readonly CLOUD_NAME = 'cyi5pmjg';
  private readonly UPLOAD_PRESET = 'tlnpeq4i';

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<HttpEvent<any>> {
    const file = files[0];
    const url = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/auto/upload`;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('upload_preset', this.UPLOAD_PRESET);
    formData.append('folder', 'angular_uploads');

    return this.http.post<HttpEvent<any>>(url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
