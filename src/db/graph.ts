import { InfluxDB } from 'influx';

interface Parameters {
  measurement: string;
  field: string;
  sensor: string;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

const lastSevenDays = () => {
  const day = new Date().getUTCDay() + 1;
  return [...days.slice(day, days.length), ...days.slice(0, day)];
};

async function graph<GraphPoint>(
  influx: InfluxDB,
  first: Parameters,
  second: Parameters,
): Promise<GraphPoint[]> {
  const getResult = (p: Parameters) => {
    return influx.query<{ mean: number }>(
      `SELECT MEAN(${p.field}) FROM ${p.measurement} WHERE sensor = '${
        p.sensor
      }' AND time > now() - 6d GROUP BY time(1d) FILL(null)`,
    );
  };

  const firstResult = await getResult(first);
  const secondResult = await getResult(second);

  const days = lastSevenDays();

  return firstResult.map(
    (v, index) =>
      (({
        date: days[index],
        [first.field]: v.mean ? v.mean.toFixed(1) : null,
        [second.field]:
          secondResult[index] && secondResult[index].mean
            ? secondResult[index].mean.toFixed(1)
            : null,
      } as unknown) as GraphPoint),
    [] as GraphPoint[],
  );
}

export default graph;
