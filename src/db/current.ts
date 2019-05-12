import { InfluxDB } from 'influx';

export async function currentWindowsStatus(influx: InfluxDB) {
  const result = await influx.query<{ type: string }>(
    `SELECT type FROM "greenrpi"."autogen"."action" WHERE type = \'WINDOWS_OPEN\' OR type = \'WINDOWS_CLOSE\' OR type = \'WINDOWS_OPEN_50\' ORDER BY DESC LIMIT 1`,
  );

  if (result[0].type === 'WINDOWS_OPEN') {
    return 'fully open';
  }

  if (result[0].type === 'WINDOWS_OPEN_50') {
    return 'half open';
  }

  if (result[0].type === 'WINDOWS_CLOSE') {
    return 'closed';
  }

  return 'N/A';
}

export async function currentPumpStatus(influx: InfluxDB) {
  const result = await influx.query<{ type: string }>(
    `SELECT type FROM "greenrpi"."autogen"."action" WHERE type = \'PUMP_ON\' OR type = \'PUMP_OFF\' ORDER BY DESC LIMIT 1`,
  );

  if (result[0].type === 'PUMP_ON') {
    return 'running';
  }

  if (result[0].type === 'PUMP_OFF') {
    return 'not running';
  }

  return 'N/A';
}
