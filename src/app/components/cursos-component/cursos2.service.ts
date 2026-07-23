import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PeriodicElement } from './cursos';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { db } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class Cursos2Service extends CrudService<PeriodicElement> {
  constructor(http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }

  // 1. 📖 BUSCAR: Mapeia o docId (Hash) e ORDENA por position/id
  override getList(): Observable<PeriodicElement[]> {
    const buscarDados = async () => {
      const querySnapshot = await getDocs(collection(db, 'cursos'));

      const listaMapeada = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();

        // 🛡️ Pega prioritariamente o 'id' real para evitar conflitos de position repetida
        const realId = Number(data['id'] ?? data['position'] ?? 0);

        return {
          ...data,
          docId: docSnap.id, // Hash único do Firestore
          id: realId,
          // Se a position estiver errada/repetida, usa o id como fallback
          position: Number(data['position'] ?? realId),
        } as PeriodicElement;
      });

      // 🔢 Ordena pelo ID único (1, 2, 3 ... 22, 23, 24)
      return listaMapeada.sort((a, b) => a.id - b.id);
    };

    return from(buscarDados());
  }

  // 2. ➕ CRIAR: Calcula o próximo ID sequencial
  override create(record: PeriodicElement): Observable<PeriodicElement> {
    const criarDado = async () => {
      const querySnapshot = await getDocs(collection(db, 'cursos'));
      let maiorId = 0;

      querySnapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const idAtual = Number(data['id'] || data['position'] || 0);
        if (idAtual > maiorId) maiorId = idAtual;
      });

      const proximoId = maiorId + 1;
      const novoRegistro = {
        ...record,
        id: proximoId,
        position: proximoId,
      };

      const docRef = await addDoc(collection(db, 'cursos'), novoRegistro);
      return { ...novoRegistro, docId: docRef.id };
    };

    return from(criarDado());
  }

  // 3. ✏️ ATUALIZAR: Atualiza usando o Hash (docId)
  override update(
    docId: string | number,
    record: Partial<PeriodicElement>,
  ): Observable<PeriodicElement> {
    const atualizarDado = async () => {
      const docRef = doc(db, 'cursos', String(docId));
      await updateDoc(docRef, record);
      return record as PeriodicElement;
    };

    return from(atualizarDado());
  }

  // 4. 🗑️ DELETAR: Deleta usando o Hash (docId)
  override delete(docId: string | number): Observable<PeriodicElement> {
    const deletarDado = async () => {
      const docRef = doc(db, 'cursos', String(docId));
      await deleteDoc(docRef);
      return {} as PeriodicElement;
    };

    return from(deletarDado());
  }

  override getById(id: string | number): Observable<PeriodicElement> {
    const buscarPorId = async () => {
      // 1. Tenta buscar direto pelo Hash (docId) no Firestore
      const docRef = doc(db, 'cursos', String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { ...docSnap.data(), docId: docSnap.id } as PeriodicElement;
      }

      // 2. Fallback: Se não achou pelo docId, busca pelo id numérico antigo
      const querySnapshot = await getDocs(collection(db, 'cursos'));
      const achado = querySnapshot.docs.find((d) => Number(d.data()['id']) === Number(id));

      if (achado) {
        return { ...achado.data(), docId: achado.id } as PeriodicElement;
      }

      throw new Error('Curso não encontrado.');
    };

    return from(buscarPorId());
  }
}
