export function rainSensorToValue(raw: number) {
  if (raw > 60000) {
    return 'none';
  }

  if (raw > 50000) {
    return 'light';
  }

  return 'heavy';
}

export function soilHumidityLowerToValue(raw: number | null) {
  if (!raw) {
    return 'N/A';
  }

  if (raw > 30000) {
    return 'dry';
  }

  if (raw < 25000) {
    return 'wet';
  }

  return 'avg';
}

export function soilHumidityUpperToValue(raw: number | null) {
  if (!raw) {
    return 'N/A';
  }

  if (raw > 48500) {
    return 'dry';
  }

  if (raw < 45000) {
    return 'wet';
  }

  return 'avg';
}

export function soilHumidityLowerToNumericValue(raw: number | null) {
  if (!raw) {
    return -1;
  }

  if (raw > 30000) {
    return 0;
  }

  if (raw < 25000) {
    return 1;
  }

  return 0.5;
}
