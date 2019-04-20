import React, { FC } from 'react';
import { Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import theme from '../theme';

interface Props {
  title: string;
  data: any[];
  yAxis: string;
  yAxisRight?: string;
  xAxis?: string;
}

const Contents = styled.div`
  display: block;
  padding: 0.75rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

  > * {
    &:first-child {
      margin-right: 1.25rem;
    }
  }
`;

const GraphCard: FC<Props> = ({ title, data, yAxis, yAxisRight, xAxis }) => (
  <Paper>
    <Contents>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>

      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart data={data}>
          {yAxis && <YAxis yAxisId="left" dataKey={yAxis} />}
          {yAxisRight && (
            <YAxis yAxisId="right" dataKey={yAxisRight} orientation="right" />
          )}
          <XAxis dataKey={xAxis} />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey={yAxis}
            stroke={theme.palette.primary.main}
          />
          {yAxisRight && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={yAxisRight}
              stroke={theme.palette.secondary.main}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Contents>
  </Paper>
);

export default GraphCard;
