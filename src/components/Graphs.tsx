import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import GraphCard from './GraphCard';
import Store from '../store/store';

const GridContainer = styled(Grid)`
  max-width: 64rem;
  /* TODO: Get rid of the important */
  margin: 0.5rem 0 !important;
`;

const Graphs: FC = () => {
  const store = Store.useStore();
  const graph = store.get('graph');

  return (
    <GridContainer container spacing={16} alignItems="baseline">
      <Grid item md={6} xs={12}>
        <GraphCard
          title="Power supply"
          data={graph.powerSupply}
          yAxis="voltage"
          yAxisUnit="V"
          yAxisRight="input"
          yAxisRightUnit="A"
          xAxis="date"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <GraphCard
          title="Indoor climate"
          data={graph.indoorClimate}
          yAxis="celsius"
          yAxisUnit="°C"
          yAxisRight="raw"
          yAxisRightUnit="%"
          xAxis="date"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <GraphCard
          title="Outdoor climate"
          data={graph.outdoorClimate}
          yAxis="celsius"
          yAxisUnit="°C"
          yAxisRight="mps"
          yAxisRightUnit="m/s"
          xAxis="date"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <GraphCard
          title="Soil climate"
          data={graph.soilClimate}
          yAxis="celsius"
          yAxisUnit="°C"
          yAxisRight="humidity"
          xAxis="date"
        />
      </Grid>
    </GridContainer>
  );
};

export default React.memo(Graphs);
