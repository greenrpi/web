import { InfluxDB } from 'influx';

import { StoreEffects } from './store';
import initInflux from '../db/init';
import latest from '../db/latest';

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
      store.set('current')({
        ...store.get('current'),
        outdoorTemp,
        windSpeed,
        indoorTemp,
        indoorHumidity,
        soilUpperTemp,
        soilLowerTemp,
      });
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

  return store;
};

export default effects;
