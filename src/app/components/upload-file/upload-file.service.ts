import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UploadProgressResult {
  progress: number;
  downloadURL?: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private readonly API_URL = 'https://the-angular-project.netlify.app/api/upload';

  constructor(private http: HttpClient) {}

  upload(files: File[]): Observable<HttpEvent<unknown>> {
    const formData = new FormData();

    files.forEach((file) => formData.append('file', file, file.name));

    const request = new HttpRequest('POST', this.API_URL, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(request);
  }
}
