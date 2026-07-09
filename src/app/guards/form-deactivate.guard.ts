export interface FormDeactivate {
  podeDesativar(): boolean | Promise<boolean> | import('rxjs').Observable<boolean>;
}
