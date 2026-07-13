export interface Cargo {
  value: string;
  viewValue: string;
}

export interface CargoGroup {
  disabled?: boolean;
  name: string;
  cargo: Cargo[];
}
