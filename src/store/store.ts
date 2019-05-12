import { Effects, createConnectedStore } from 'undux';
import effects from './effects';
import { ReactNode } from 'react';
import { ActionType } from '../db/scheduleAction';

interface Snackbar {
  key: string;
  message: ReactNode;
  action?: ReactNode[];
}

interface GraphPoint {
  date: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
}

export interface PowerSupplyGP extends GraphPoint {
  voltage: number | null;
  input: number | null;
}

export interface IndoorClimateGP extends GraphPoint {
  temperature: number | null;
  humidity: number | null;
}

export interface IndoorClimateGP extends GraphPoint {
  temperature: number | null;
  humidity: number | null;
}

export interface OutdoorClimateGP extends GraphPoint {
  temperature: number | null;
  windSpeed: number | null;
}

export interface SoilClimateGP extends GraphPoint {
  temperature: number | null;
  raw: number | null;
  humidity: number;
}

export interface ActionsLogItem {
  id: string;
  description: string;
  date: string;
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
    soilUpperHumidity?: string;
    soilLowerHumidity?: string;
    windows?: string;
    pump?: string;
  };
  graph: {
    powerSupply: PowerSupplyGP[];
    indoorClimate: IndoorClimateGP[];
    outdoorClimate: OutdoorClimateGP[];
    soilClimate: SoilClimateGP[];
  };
  scheduledLog: ActionsLogItem[];
  actionsLog: ActionsLogItem[];
  // Action planned through control card
  nextAction?: ActionType;
};

const initialState: State = {
  initialized: false,
  credentials: undefined,
  snackbars: [],
  lastUpdate: undefined,
  current: {},
  graph: {
    powerSupply: [],
    indoorClimate: [],
    outdoorClimate: [],
    soilClimate: [],
  },
  scheduledLog: [],
  actionsLog: [],
  nextAction: undefined,
};

const Store = createConnectedStore(initialState, effects);

export default Store;

export type StoreEffects = Effects<State>;
