import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import TableCard from './TableCard';
import Store from '../store/store';

const Logs: FC = () => {
  const store = Store.useStore();
  const scheduledLog = store.get('scheduledLog');
  const actionsLog = store.get('actionsLog');

  return (
    <React.Fragment>
      <Grid item md={4} sm={6} xs={12}>
        <TableCard title="Scheduled Actions" rows={scheduledLog} />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <TableCard title="Actions log" rows={actionsLog} />
      </Grid>
    </React.Fragment>
  );
};

export default Logs;
