import { StoreEffects } from './store';
import initInflux from '../db/init';

let influx;

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

    const result = await influx.query('SELECT * FROM temperatures');
    console.log('Temperatures', result);
    store.set('credentials')(undefined);
    store.set('initialized')(true);
  });

  return store;
};

export default effects;
