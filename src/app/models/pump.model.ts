import { PumpState } from './pump-control-params.model';

export interface Pump {
  id: number;
  name: string;
  state: PumpState;
}
