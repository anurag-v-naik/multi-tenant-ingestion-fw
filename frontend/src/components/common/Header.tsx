import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Data Ingestion Framework
          </Typography>
        </Box>
        <Typography variant="body1">
          {/* User persona can be displayed here */}
          User: Engineer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

