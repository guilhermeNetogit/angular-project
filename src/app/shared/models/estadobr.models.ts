export interface EstadoBr {
  estados: Estado[];
}

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
  cidades: string[];
}
