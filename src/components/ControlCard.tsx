import React, { FC } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

interface Props {
  name: string;
  description: string;
}

const ControlCard: FC<Props> = ({ name, description }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2">
        {name}
      </Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
    <CardActions>
      <Button>Shutdown</Button>
      <Button>Reboot</Button>
    </CardActions>
  </Card>
);

export default ControlCard;
