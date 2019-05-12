import { InfluxDB, FieldType } from 'influx';

import config from '../config.json';

function init(username: string, password: string) {
  return new InfluxDB({
    host: config.DB_HOST,
    database: config.DB_NAME,
    port: config.DB_PORT,
    username,
    password,
    protocol: location.protocol === 'http:' ? 'http' : 'https',
    schema: [
      {
        measurement: 'temperature',
        fields: {
          celsius: FieldType.INTEGER,
        },
        tags: ['sensor'],
      },
      {
        measurement: 'action',
        fields: {
          type: FieldType.STRING,
        },
        tags: ['id', 'manual'],
      },
    ],
  });
}

export default init;
