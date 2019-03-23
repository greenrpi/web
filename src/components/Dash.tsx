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
} from '@material-ui/core';
import styled from 'styled-components';

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
  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            GreenRPi
          </Typography>
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
