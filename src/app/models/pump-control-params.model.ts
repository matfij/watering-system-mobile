export interface PumpControlParams {
  id: number;
  command: PumpState;
  date?: string;
}

export enum PumpState {
  stop,
  start
}
