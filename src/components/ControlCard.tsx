import React, { FC } from 'react';
import { Typography, Card, CardContent, CardActions } from '@material-ui/core';

interface Props {
  name: string;
  description: string;
}

const ControlCard: FC<Props> = ({ name, description, children }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h3">
        {name}
      </Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
    <CardActions>{children}</CardActions>
  </Card>
);

export default ControlCard;
