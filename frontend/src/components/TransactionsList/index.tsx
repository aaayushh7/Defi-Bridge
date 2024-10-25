import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export const TransactionsList: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.bridge.transactions);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>From Chain</TableCell>
            <TableCell>To Chain</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.fromChain}</TableCell>
              <TableCell>{tx.toChain}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          )
        )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};