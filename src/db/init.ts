import Influx from 'influx';

import config from '../config.json';

function init(username: string, password: string) {
  return new Influx.InfluxDB({
    host: config.DB_HOST,
    database: config.DB_NAME,
    username,
    password,
    schema: [
      {
        measurement: 'temperature',
        fields: {
          celsius: Influx.FieldType.INTEGER,
        },
        tags: ['sensor'],
      },
    ],
  });
}

export default init;
