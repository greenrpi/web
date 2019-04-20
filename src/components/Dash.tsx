import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import styled from 'styled-components';

import Store from '../store/store';
import logo from '../res/logo.svg';
import temperatureIcon from '../res/icons/temperature.svg';
import windIcon from '../res/icons/wind.svg';
import rainIcon from '../res/icons/rain.svg';
import humidityIcon from '../res/icons/humidity.svg';
import soilIcon from '../res/icons/soil.svg';
import ReadingCard from './ReadingCard';
import GraphCard from './GraphCard';
import fakeData from '../res/fakeData.json';
import fakeLogs from '../res/fakeLogs.json';
import ControlCard from './ControlCard';
import TableCard from './TableCard';

const Logo = styled.img`
  height: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96vw;
  margin-left: 2vw;
  padding: 1rem;

  > .MuiGrid-container-1 {
    width: 100%;
    max-width: 64rem;
    margin: 0.5rem 0;
  }

  > .MuiGrid-container-1:first-of-type {
    margin: 2rem 0;
  }
`;

const Dash = () => {
  const store = Store.useStore();

  const onRefresh = () => {
    store.set('credentials')(store.get('credentials'));
  };

  return (
    <Container>
      <Grid container spacing={16} justify="space-between" alignItems="center">
        <Grid item>
          <Logo src={logo} alt="Logo GreenRPi" />
        </Grid>

        <Grid item>
          <Typography>Last updated: 10 seconds ago</Typography>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            onClick={() => store.set('initialized')(false)}
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={16}
        alignItems="baseline"
        justify="space-between"
      >
        <Grid item md={6} xs={12} container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Outdoor</Typography>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ReadingCard
              name="Temperature"
              value="13 °C"
              iconPath={temperatureIcon}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ReadingCard name="Wind speed" value="5 m/s" iconPath={windIcon} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ReadingCard name="Rain" value="none" iconPath={rainIcon} />
          </Grid>
        </Grid>

        <Grid item md={6} xs={12} container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Indoor</Typography>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ReadingCard
              name="Temperature"
              value="13 °C"
              iconPath={temperatureIcon}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ReadingCard name="Humidity" value="20%" iconPath={humidityIcon} />
          </Grid>
          <Grid item xs={12}>
            <ReadingCard name="Soil" value="20%" iconPath={soilIcon} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={16} alignItems="baseline">
        <Grid item md={6} xs={12}>
          <GraphCard
            title="Power supply"
            data={fakeData}
            yAxis="voltage"
            xAxis="date"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <GraphCard
            title="Indoor climate"
            data={fakeData}
            yAxis="voltage"
            yAxisRight="input"
            xAxis="date"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <GraphCard title="Outdoor climate" data={fakeData} yAxis="voltage" />
        </Grid>
        <Grid item md={6} xs={12}>
          <GraphCard title="Soil climate" data={fakeData} yAxis="voltage" />
        </Grid>
      </Grid>

      <Grid container spacing={16} alignItems="stretch" justify="space-between">
        <Grid item md={4} sm={6} xs={12} container spacing={16}>
          <Grid item xs={12}>
            <ControlCard
              name="Power controls"
              description="Currently running."
            />
          </Grid>
          <Grid item xs={12}>
            <ControlCard name="Windows" description="Currently fully open." />
          </Grid>
          <Grid item xs={12}>
            <ControlCard
              name="Water pump"
              description="Currently not running."
            />
          </Grid>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <TableCard title="Scheduled Actions" rows={[]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <TableCard title="Actions log" rows={fakeLogs} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dash;
