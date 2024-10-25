import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { TransactionsList } from '../../components/TransactionsList';
import { NetworkGraph } from '../../components/NetworkGraph';

export const Dashboard: React.FC = () => {
  const networkData = {
    nodes: [
      { id: '1', name: 'Ethereum' },
      { id: '2', name: 'BSC' },
      { id: '3', name: 'Polygon' }
    ],
    links: [
      { source: '1', target: '2', value: 1 },
      { source: '2', target: '3', value: 1 },
      { source: '1', target: '3', value: 1 }
    ]
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          DeFi Bridge Dashboard
        </Typography>
        <Box mb={3}>
          <NetworkGraph nodes={networkData.nodes} links={networkData.links} />
        </Box>
        <Box>
          <TransactionsList />
        </Box>
      </Box>
    </Container>
  );
};
