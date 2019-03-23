import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import styled from 'styled-components';
import Store from '../store/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding: 1rem;

  > * {
    width: 100%;
    max-width: 50rem;

    &:last-child {
      margin-top: 1rem;
    }
  }
`;

const Dash = () => {
  const store = Store.useStore();

  const onRefresh = () => {
    store.set('credentials')(store.get('credentials'));
  };

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            GreenRPi
          </Typography>
          <IconButton onClick={onRefresh} color="inherit">
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={16}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Temperature
              </Typography>
              <Typography variant="h5" component="h2">
                be nev lent
              </Typography>
              <Typography color="textSecondary">adjective</Typography>
              <Typography component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dash;
