import { Injectable } from '@angular/core';

export interface Quarto {
  id: number;
  descricao: string;
  resumo: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuartoService {

  private quartos: Quarto[] = [
    {id: 1, descricao: 'Teste de Einstein', resumo: 'O enigma consiste em descobrir qual é o dono do peixe através de uma matriz de dados. A premissa básica é: Existem 5 casas de cores diferentes, cada uma habitada por uma pessoa de nacionalidade diferente. Cada morador bebe algo específico, fuma uma marca de cigarro e tem um animal de estimação. Através de um conjunto de 15 pistas  você deve cruzar as informações e descobrir o resultado.'},
    {id: 2, descricao: 'The Hardest Logic Puzzle Ever', resumo: 'Criado pelo filósofo George Boolos, este é considerado um dos enigmas mais difíceis do mundo. Você deve fazer três perguntas de "sim" ou "não" a três deuses (um que diz sempre a verdade, um que sempre mente e um que responde aleatoriamente) para descobrir quem é quem.'},
    {id: 3, descricao: 'O Enigma de Lewis Carroll', resumo: 'Problema de velocidade de caminhada, onde você precisa deduzir distâncias e tempos a partir de variáveis como subidas, descidas e terrenos planos.'},
    {id: 4, descricao: 'Sudoku', resumo: 'Apesar de usar números, o Sudoku não envolve matemática, mas sim dedução lógica pura. O objetivo é preencher uma grade 9 × 9 com números de 1 a 9, de modo que cada linha, coluna e bloco 3 × 3 contenha todos os números sem repetição, exigindo a mesma eliminação de possibilidades do Teste de Einstein.'}
  ];

  getAll(): Quarto[] {
    return this.quartos;
  }

  update(quartoAtualizado: Quarto) {
    const index = this.quartos.findIndex(q => q.id === quartoAtualizado.id);
    if (index !== -1) {
      this.quartos[index] = quartoAtualizado;
    }
  }
}
