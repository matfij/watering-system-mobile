export interface PumpControlParams {
  id: number;
  state: PumpState;
  date?: string;
}

export enum PumpState {
  stop,
  start
}
