import React, { FC } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  title: string;
  rows: any[];
}

const ScrollablePaper = styled(Paper)`
  height: 100%;

  h3 {
    padding: 1rem 0 0 1rem;
  }

  tbody {
    overflow-y: auto;
  }
`;

const TableCard: FC<Props> = ({ title, rows }) => (
  <ScrollablePaper>
    <Typography variant="subtitle1" component="h3">
      {title}
    </Typography>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Action</TableCell>
          <TableCell align="right">Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.action}
            </TableCell>
            <TableCell align="right">{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </ScrollablePaper>
);

export default TableCard;
