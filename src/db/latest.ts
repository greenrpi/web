import { InfluxDB } from 'influx';

async function latest(
  influx: InfluxDB,
  measurement: string,
  field: string,
  sensor: string,
  round = true,
) {
  if (round) {
    const result = await influx.query<{ round: number }>(
      `SELECT ROUND(${field}) FROM ${measurement} WHERE sensor = '${sensor}' ORDER BY DESC LIMIT 1`,
    );
    return result[0].round;
  } else {
    const result = await influx.query<{ latest: number }>(
      `SELECT "${field}" AS "latest" FROM ${measurement} WHERE sensor = '${sensor}' ORDER BY DESC LIMIT 1`,
    );
    return result[0].latest;
  }
}

export default latest;
