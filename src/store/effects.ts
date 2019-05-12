import { InfluxDB } from 'influx';

import {
  StoreEffects,
  PowerSupplyGP,
  IndoorClimateGP,
  OutdoorClimateGP,
  SoilClimateGP,
} from './store';
import initInflux from '../db/init';
import latest from '../db/latest';
import graph from '../db/graph';
import scheduleAction from '../db/scheduleAction';
import {
  rainSensorToValue,
  soilHumidityUpperToValue,
  soilHumidityLowerToValue,
  soilHumidityLowerToNumericValue,
} from '../logic';
import { currentPumpStatus, currentWindowsStatus } from '../db/current';
import { actionsLog, typeHr } from '../db/logs';

let influx: InfluxDB;
let updateInterval: number | undefined;

const effects: StoreEffects = store => {
  store.on('credentials').subscribe(async credentials => {
    if (!credentials) return;

    influx = initInflux(credentials.name, credentials.password);

    // Check credentials by checking access to the db
    try {
      await influx.getMeasurements();
    } catch (e) {
      const snack = {
        key: (Math.random() * 1000).toString(),
        message:
          'Unable to initialize, make sure your credentials are correct.',
      };
      store.set('snackbars')([...store.get('snackbars'), snack]);
      store.set('credentials')(undefined);
      return;
    }

    const periodicUpdate = async () => {
      const outdoorTemp = await latest(
        influx,
        'temperature',
        'celsius',
        'outdoor',
      );
      const windSpeed = await latest(influx, 'wind', 'mps', 'outdoor', false);
      const indoorTemp = await latest(
        influx,
        'temperature',
        'celsius',
        'indoor',
      );
      const indoorHumidity = await latest(influx, 'humidity', 'raw', 'indoor');
      const soilUpperTemp = await latest(
        influx,
        'temperature',
        'celsius',
        'soilu',
      );
      const soilLowerTemp = await latest(
        influx,
        'temperature',
        'celsius',
        'soill',
      );
      const soilUpperHumidity = await latest(
        influx,
        'humidity',
        'raw',
        'soilu',
      );
      const soilLowerHumidity = await latest(
        influx,
        'humidity',
        'raw',
        'soill',
      );
      const rainFirst = await latest(influx, 'rain', 'raw', 'first');
      const rainSecond = await latest(influx, 'rain', 'raw', 'second');
      store.set('current')({
        ...store.get('current'),
        outdoorTemp,
        windSpeed: parseFloat(windSpeed.toFixed(1)),
        indoorTemp,
        indoorHumidity,
        soilUpperTemp,
        soilLowerTemp,
        soilUpperHumidity: soilHumidityUpperToValue(soilUpperHumidity),
        soilLowerHumidity: soilHumidityLowerToValue(soilLowerHumidity),
        rain: rainSensorToValue(rainFirst + rainSecond / 2),
        windows: await currentWindowsStatus(influx),
        pump: await currentPumpStatus(influx),
      });

      const powerSupply = await graph<PowerSupplyGP>(
        influx,
        { measurement: 'power', field: 'voltage', sensor: 'controller' },
        { measurement: 'power', field: 'input', sensor: 'controller' },
      );
      const indoorClimate = await graph<IndoorClimateGP>(
        influx,
        { measurement: 'temperature', field: 'celsius', sensor: 'indoor' },
        { measurement: 'humidity', field: 'raw', sensor: 'indoor' },
      );
      const outdoorClimate = await graph<OutdoorClimateGP>(
        influx,
        { measurement: 'temperature', field: 'celsius', sensor: 'outdoor' },
        { measurement: 'wind', field: 'mps', sensor: 'outdoor' },
      );
      const soilClimate = await graph<SoilClimateGP>(
        influx,
        { measurement: 'temperature', field: 'celsius', sensor: 'soill' },
        { measurement: 'humidity', field: 'raw', sensor: 'soill' },
      );
      store.set('graph')({
        ...store.get('graph'),
        powerSupply,
        indoorClimate,
        outdoorClimate,
        soilClimate: soilClimate.map(c => ({
          ...c,
          humidity: soilHumidityLowerToNumericValue(c.raw),
        })),
      });

      store.set('actionsLog')(await actionsLog(influx));
      store.set('scheduledLog')([]);

      store.set('lastUpdate')(new Date());
    };
    window.clearInterval(updateInterval);
    window.setInterval(periodicUpdate, 10 * 1000);
    await periodicUpdate();

    store.set('initialized')(true);
    store.set('credentials')(undefined);
  });

  store.on('initialized').subscribe(initialized => {
    if (!initialized) window.clearInterval(updateInterval);
  });

  store.on('nextAction').subscribe(action => {
    if (!action) return;

    scheduleAction(influx, action);
    store.set('scheduledLog')([
      ...store.get('scheduledLog'),
      {
        id: (Math.random() * 1000).toString(36),
        description: `Manual ${typeHr[action]}`,
        date: 'now',
      },
    ]);
    store.set('nextAction')(undefined);

    const snack = {
      key: (Math.random() * 1000).toString(),
      message: 'Scheduled action.',
    };
    store.set('snackbars')([...store.get('snackbars'), snack]);
  });

  return store;
};

export default effects;
