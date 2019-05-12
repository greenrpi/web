import { InfluxDB } from 'influx';
import { distanceInWordsToNow } from 'date-fns';

import { ActionType } from './scheduleAction';
import { ActionsLogItem } from '../store/store';

export const typeHr: { [key in ActionType]: string } = {
  SHUTDOWN: 'shutdown',
  REBOOT: 'reboot',
  WINDOWS_CLOSE: 'closing of windows',
  WINDOWS_OPEN_50: 'opening of windows to 50%',
  WINDOWS_OPEN: 'opening of windows',
  PUMP_ON: 'turning pump on',
  PUMP_OFF: 'turning pump off',
};

function actionToHr(type: ActionType, manual: boolean) {
  return `${manual ? 'Manual' : 'Automatic'} ${typeHr[type]}`;
}

export async function actionsLog(influx: InfluxDB) {
  const result = await influx.query<{
    time: Date;
    id: string;
    type: string;
    manual: string;
  }>('SELECT id, type, manual FROM "action" ORDER BY DESC LIMIT 16');

  return result.reduce(
    (acc, action) => {
      if (acc.some(a => a.id === action.id) || acc.length > 8) {
        return acc;
      }

      acc.push({
        id: action.id,
        description: actionToHr(
          action.type as ActionType,
          action.manual === 'yes',
        ),
        date: distanceInWordsToNow(action.time),
      });

      return acc;
    },
    [] as ActionsLogItem[],
  );
}
