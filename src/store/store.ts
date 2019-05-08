import { Effects, createConnectedStore } from 'undux';
import effects from './effects';
import { ReactNode } from 'react';

interface Snackbar {
  key: string;
  message: ReactNode;
  action?: ReactNode[];
}

type State = {
  initialized: boolean;
  credentials?: {
    name: string;
    password: string;
  };
  snackbars: Array<Snackbar>;
  lastUpdate?: Date;
  current: {
    outdoorTemp?: number;
    windSpeed?: number;
    rain?: string;
    indoorTemp?: number;
    indoorHumidity?: number;
    soilUpperTemp?: number;
    soilLowerTemp?: number;
    soilUpperHumidity?: number;
    soilLowerHumidity?: number;
  };
};

const initialState: State = {
  initialized: false,
  credentials: undefined,
  snackbars: [],
  lastUpdate: undefined,
  current: {},
};

const Store = createConnectedStore(initialState, effects);

export default Store;

export type StoreEffects = Effects<State>;
