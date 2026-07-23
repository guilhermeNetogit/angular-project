import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
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
  uploadToFirebase(files: File[]): Observable<UploadProgressResult> {
    return new Observable((observer) => {
      const storage = getStorage();
      let totalBytesTransferred = 0;
      let totalBytesOverall = files.reduce((acc, f) => acc + f.size, 0);

      const downloadUrls: string[] = [];
      let arquivosConcluidos = 0;

      files.forEach((file) => {
        // Define o caminho no Firebase Storage (ex: uploads/nome-do-arquivo.ext)
        const storageRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Calcula o progresso ponderado entre todos os arquivos selecionados
            const percentIndividual = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            // Notifica o progresso percentual (0 a 100)
            const progressoGeral = Math.round(
              ((totalBytesTransferred + snapshot.bytesTransferred) / totalBytesOverall) * 100,
            );

            observer.next({
              progress: Math.min(progressoGeral, 99),
              completed: false,
            });
          },
          (error) => {
            console.error('Erro no upload para o Storage:', error);
            observer.error(error);
          },
          async () => {
            // Ao finalizar este arquivo, pega a URL de download
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            downloadUrls.push(url);
            arquivosConcluidos++;

            totalBytesTransferred += file.size;

            // Quando todos os arquivos forem enviados com sucesso
            if (arquivosConcluidos === files.length) {
              observer.next({
                progress: 100,
                downloadURL: downloadUrls.join(', '),
                completed: true,
              });
              observer.complete();
            }
          },
        );
      });
    });
  }
}
