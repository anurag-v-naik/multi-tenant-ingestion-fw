import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Assume these API functions are imported from your api.js file.
// We're using a placeholder for now.
const deleteConnector = async (id) => {
  console.log(`Deleting connector with ID: ${id}`);
  return true;
};

// Define the Connector type. This is crucial for type safety.
// Your actual type may have more properties, but this is the minimum needed
// to resolve the build error.
interface Connector {
  id: string | number;
  name: string;
  sourceType: string;
  // Add other properties as needed
}

// Define the headers array with the correct type for the 'key' property.
// The `keyof Connector` ensures that the keys are valid properties of the Connector type.
interface TabularHeader {
  key: keyof Connector;
  label: string;
}

const connectorHeaders: TabularHeader[] = [
  { key: 'name', label: 'Name' },
  { key: 'sourceType', label: 'Source Type' },
  // Add other headers that match your Connector properties
];

const TabularContainer = ({ data, headers, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 3, mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.key}>{header.label}</TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.key}>{row[header.key]}</TableCell>
              ))}
              <TableCell align="right">
                <IconButton onClick={() => onEdit(row)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(row)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Main Connectors component
export default function App() {
  const [connectors, setConnectors] = useState<Connector[]>([]);

  // Placeholder for fetching data
  useEffect(() => {
    // In your actual code, you would call getConnectors() here
    const mockData: Connector[] = [
      { id: '1', name: 'Salesforce Connector', sourceType: 'Salesforce' },
      { id: '2', name: 'MySQL Connector', sourceType: 'MySQL' },
    ];
    setConnectors(mockData);
  }, []);

  // Your original handleDelete function
  const handleDelete = async (connector: Connector) => {
    if (window.confirm(`Are you sure you want to delete ${connector.name}?`)) {
      // The `connector.id` is now typed correctly, so this works.
      await deleteConnector(connector.id);
      // After deletion, you'd re-fetch your data
      console.log('Connector deleted. Refreshing data...');
    }
  };

  const handleEdit = (connector: Connector) => {
    console.log(`Editing connector: ${connector.name}`);
  };
  
  const handleAdd = () => {
    console.log('Adding new connector...');
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1>Connectors</h1>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Add New Connector
      </Button>
      <TabularContainer
        data={connectors}
        headers={connectorHeaders}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
}

