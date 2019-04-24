import React, { FC } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  iconPath: string;
  nameLeft: string;
  valueLeft: string;
  nameRight: string;
  valueRight: string;
}

const Icon = styled.img`
  height: 4rem;
`;

const Value = styled(Typography)`
  font-size: 2rem;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;

  padding: 0.75rem;

  > * {
    &:first-child {
      margin-right: 1.25rem;
    }
  }
`;

const SplitReadingCard: FC<Props> = ({
  iconPath,
  nameLeft,
  valueLeft,
  nameRight,
  valueRight,
}) => (
  <Paper>
    <Contents>
      <Icon alt={`${nameLeft} icon`} src={iconPath} />

      <Grid container spacing={16}>
        <Grid item md={6}>
          <Typography variant="subtitle1" component="h3">
            {nameLeft}
          </Typography>
          <Value variant="h4">{valueLeft}</Value>
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1" component="h3">
            {nameRight}
          </Typography>
          <Value variant="h4">{valueRight}</Value>
        </Grid>
      </Grid>
    </Contents>
  </Paper>
);

export default SplitReadingCard;
