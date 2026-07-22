import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  upload(files: File[], url: '/api/upload'): Observable<HttpEvent<unknown>> {
    const formData = new FormData();

    files.forEach((file) => formData.append('file', file, file.name));

    const request = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(request);
  }
}
