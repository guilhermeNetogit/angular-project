import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private readonly API_URL = 'https://the-angular-project.netlify.app/api/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    return new Observable((observer) => {
      const reader = new FileReader();

      // Lê o arquivo como Data URL (ex: "data:image/jpeg;base64,/9j/4AAQSkZJRg...")
      reader.readAsDataURL(file);

      reader.onload = () => {
        const payload = {
          file: reader.result, // Envia a Data URL completa com tipo e extensão
          fileName: file.name,
        };

        this.http.post(this.API_URL, payload).subscribe({
          next: (res) => {
            observer.next(res);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
      };

      reader.onerror = (error) => observer.error(error);
    });
  }
}
