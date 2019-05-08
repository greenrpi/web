import React, { FC, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Store from '../store/store';

const useCountDown = (updated?: Date) => {
  const [secondsAgo, setSecondsAgo] = useState<number | string>(0);
  useEffect(() => {
    const firstOffset = updated
      ? Math.round((Date.now() - updated.valueOf()) / 1000)
      : 'N/A';
    if (firstOffset === 'N/A') {
      setSecondsAgo('N/A');
      return;
    }
    setSecondsAgo(firstOffset);

    const interval = window.setInterval(() => {
      typeof secondsAgo === 'number' && setSecondsAgo(secondsAgo + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  });

  return secondsAgo;
};

const LastUpdated: FC = () => {
  const store = Store.useStore();
  const lastUpdate = store.get('lastUpdate');

  const secondsAgo = useCountDown(lastUpdate);

  return <Typography>Last updated: {secondsAgo} seconds ago</Typography>;
};

export default LastUpdated;
