import React, { FC } from 'react';
import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  name: string;
  iconPath: string;
  value: string;
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

const ReadingCard: FC<Props> = ({ name, iconPath, value }) => (
  <Paper>
    <Contents>
      <Icon alt={`${name} icon`} src={iconPath} />

      <div>
        <Typography variant="subtitle1" component="h3">
          {name}
        </Typography>
        <Value variant="h4">{value}</Value>
      </div>
    </Contents>
  </Paper>
);

export default ReadingCard;
