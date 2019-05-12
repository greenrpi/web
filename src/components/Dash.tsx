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
import ControlCard from './ControlCard';
import SplitReadingCard from './SplitReadingCard';
import LastUpdated from './LastUpdated';
import Graphs from './Graphs';
import Logs from './Logs';

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
              value={`${valueOrNa(current.rain)}`}
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
              )}`}
              nameRight="Soil - Lower"
              valueRight={`${valueOrNa(current.soilLowerTemp)} °C/${valueOrNa(
                current.soilLowerHumidity,
              )}`}
              iconPath={soilIcon}
            />
          </Grid>
        </Grid>
      </GridContainer>

      <Graphs />

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
              <Button onClick={() => store.set('nextAction')('SHUTDOWN')}>
                Shutdown
              </Button>
              <Button onClick={() => store.set('nextAction')('REBOOT')}>
                Reboot
              </Button>
            </ControlCard>
          </Grid>
          <Grid item xs={12}>
            <ControlCard
              name="Windows"
              description={`Currently ${current.windows}.`}
            >
              <Button onClick={() => store.set('nextAction')('WINDOWS_CLOSE')}>
                Close
              </Button>
              <Button
                onClick={() => store.set('nextAction')('WINDOWS_OPEN_50')}
              >
                Open to 50%
              </Button>
              <Button onClick={() => store.set('nextAction')('WINDOWS_OPEN')}>
                Open
              </Button>
            </ControlCard>
          </Grid>
          <Grid item xs={12}>
            <ControlCard
              name="Water pump"
              description={`Currently ${current.pump}.`}
            >
              <Button onClick={() => store.set('nextAction')('PUMP_OFF')}>
                Turn off
              </Button>
              <Button onClick={() => store.set('nextAction')('PUMP_ON')}>
                Turn on
              </Button>
            </ControlCard>
          </Grid>
        </Grid>

        <Logs />
      </GridContainer>
    </Container>
  );
};

export default Dash;
