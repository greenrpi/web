import { InfluxDB } from 'influx';

export type ActionType =
  | 'SHUTDOWN'
  | 'REBOOT'
  | 'WINDOWS_CLOSE'
  | 'WINDOWS_OPEN_50'
  | 'WINDOWS_OPEN'
  | 'PUMP_ON'
  | 'PUMP_OFF';

async function scheduleAction(influx: InfluxDB, action: ActionType) {
  const randId = Math.random()
    .toString(36)
    .slice(2);

  const result = await influx.writePoints([
    {
      measurement: 'action',
      tags: { id: randId, manual: 'yes' },
      fields: { type: action },
    },
  ]);
  return result;
}

export default scheduleAction;
