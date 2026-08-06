import { Injectable } from '@angular/core';
import { db } from '../../app.config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCrudService {

  async verificarExistencia(colecao: string, campo: string, valor: string): Promise<boolean> {
    const q = query(
      collection(db, colecao),
      where(campo, '==', valor)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Retorna true se encontrou registro
  }

  salvar<T>(colecao: string, dados: T): Observable<T & { docId: string }> {
    const salvarNoFirestore = async () => {
      const payload = {
        ...dados,
        criadoEm: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, colecao), payload);
      return { ...payload, docId: docRef.id };
    };

    return from(salvarNoFirestore());
  }
}
