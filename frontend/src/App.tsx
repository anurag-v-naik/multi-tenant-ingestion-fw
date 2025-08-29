
import React, { useState } from 'react';
import { Container, Box, Tabs, Tab, Typography } from '@mui/material';
import Header from './components/common/Header';
import ConnectorsTab from './components/ConnectorsTab';
import PipelinesTab from './components/PipelinesTab';
import ProcessorsTab from './components/ProcessorsTab';
import SchedulesTab from './components/SchedulesTab';

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="data ingestion tabs">
            <Tab label="Connectors" />
            <Tab label="Processors" />
            <Tab label="Pipelines" />
            <Tab label="Schedules" />
            <Tab label="Dashboard" />
          </Tabs>
        </Box>
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
          {value === 0 && <ConnectorsTab />}
          {value === 1 && <ProcessorsTab />}
          {value === 2 && <PipelinesTab />}
          {value === 3 && <SchedulesTab />}
          {value === 4 && <Typography>Dashboard content here...</Typography>}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
