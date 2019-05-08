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
import dummyIndoorClimate from '../res/dummyIndoorClimate.json';
import dummyLogs from '../res/dummyLogs.json';
import dummyOutdoorClimate from '../res/dummyOutdoorClimate.json';
import dummyPowerSupply from '../res/dummyPowerSupply.json';
import dummySoilClimate from '../res/dummySoilClimate.json';
import ControlCard from './ControlCard';
import TableCard from './TableCard';
import SplitReadingCard from './SplitReadingCard';
import LastUpdated from './LastUpdated';

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
`;

const GridContainer = styled(Grid)`
  max-width: 64rem;
  /* TODO: Get rid of the important */
  margin: 0.5rem 0 !important;
`;

const HeadingGridContainer = styled(GridContainer)`
  /* TODO: Get rid of the important */
  margin: 2rem 0;
`;

const Dash = () => {
  const store = Store.useStore();

  const current = store.get('current');
  const valueOrNa = (value?: number | string) =>
    value === undefined ? 'N/A' : value;

  return (
    <Container>
      <HeadingGridContainer
        container
        spacing={16}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Logo src={logo} alt="Logo GreenRPi" />
        </Grid>

        <Grid item>
          <LastUpdated />
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            onClick={() => store.set('initialized')(false)}
          >
            Logout
          </Button>
        </Grid>
      </HeadingGridContainer>

      <GridContainer
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
              value={`${valueOrNa(current.outdoorTemp)} °C`}
              iconPath={temperatureIcon}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ReadingCard
              name="Wind speed"
              value={`${valueOrNa(current.windSpeed)} m/s`}
              iconPath={windIcon}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ReadingCard
              name="Rain"
              value={valueOrNa(current.rain)}
              iconPath={rainIcon}
            />
          </Grid>
        </Grid>

        <Grid item md={6} xs={12} container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Indoor</Typography>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ReadingCard
              name="Temperature"
              value={`${valueOrNa(current.indoorTemp)} °C`}
              iconPath={temperatureIcon}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <ReadingCard
              name="Humidity"
              value={`${valueOrNa(current.indoorHumidity)} %`}
              iconPath={humidityIcon}
            />
          </Grid>
          <Grid item xs={12}>
            <SplitReadingCard
              nameLeft="Soil - Upper"
              valueLeft={`${valueOrNa(current.soilUpperTemp)} °C/${valueOrNa(
                current.soilUpperHumidity,
              )} %`}
              nameRight="Soil - Lower"
              valueRight={`${valueOrNa(current.soilLowerTemp)} °C/${valueOrNa(
                current.soilLowerHumidity,
              )} %`}
              iconPath={soilIcon}
            />
          </Grid>
        </Grid>
      </GridContainer>

      <GridContainer container spacing={16} alignItems="baseline">
        <Grid item md={6} xs={12}>
          <GraphCard
            title="Power supply"
            data={dummyPowerSupply}
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
            data={dummyIndoorClimate}
            yAxis="temperature"
            yAxisUnit="°C"
            yAxisRight="humidity"
            yAxisRightUnit="%"
            xAxis="date"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <GraphCard
            title="Outdoor climate"
            data={dummyOutdoorClimate}
            yAxis="temperature"
            yAxisUnit="°C"
            yAxisRight="humidity"
            yAxisRightUnit="%"
            xAxis="date"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <GraphCard
            title="Soil climate"
            data={dummySoilClimate}
            yAxis="temperature"
            yAxisUnit="°C"
            yAxisRight="humidity"
            yAxisRightUnit="%"
            xAxis="date"
          />
        </Grid>
      </GridContainer>

      <GridContainer
        container
        spacing={16}
        alignItems="stretch"
        justify="space-between"
      >
        <Grid item md={4} sm={6} xs={12} container spacing={16}>
          <Grid item xs={12}>
            <ControlCard
              name="Power controls"
              description="Microcomputer currently running."
            >
              <Button>Shutdown</Button>
              <Button>Reboot</Button>
            </ControlCard>
          </Grid>
          <Grid item xs={12}>
            <ControlCard name="Windows" description="Currently fully open.">
              <Button>Close</Button>
              <Button>Open to 50%</Button>
              <Button>Open</Button>
            </ControlCard>
          </Grid>
          <Grid item xs={12}>
            <ControlCard name="Water pump" description="Currently not running.">
              <Button>Turn off</Button>
              <Button>Turn on</Button>
            </ControlCard>
          </Grid>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <TableCard title="Scheduled Actions" rows={[]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <TableCard title="Actions log" rows={dummyLogs} />
        </Grid>
      </GridContainer>
    </Container>
  );
};

export default Dash;
