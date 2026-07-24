import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private readonly CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/cyi5pmjg/auto/upload';

  private readonly UPLOAD_PRESET = 'tlnpeq4i';

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<any> {
    const file = files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);
    formData.append('folder', 'angular_uploads');

    return this.http.post(this.CLOUDINARY_URL, formData);
  }
}
