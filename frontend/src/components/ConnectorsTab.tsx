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
  Box,
  Typography,
  Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Assume these API functions are imported from your api.js file.
// We're using a placeholder for now.
const deleteConnector = async (id: string | number) => {
  console.log(`Deleting connector with ID: ${id}`);
  return true;
};

// Define the Connector type to ensure type safety across the component.
interface Connector {
  id: string | number;
  name: string;
  sourceType: string;
  // Add other properties that exist on your connector objects
}

// Define the type for the table headers, ensuring 'key' is a valid property of Connector.
interface TabularHeader {
  key: keyof Connector;
  label: string;
}

const connectorHeaders: TabularHeader[] = [
  { key: 'name', label: 'Name' },
  { key: 'sourceType', label: 'Source Type' },
  // Add other headers that match your Connector properties
];

const TabularContainer = ({ data, headers, onEdit, onDelete }: { data: Connector[], headers: TabularHeader[], onEdit: (connector: Connector) => void, onDelete: (connector: Connector) => void }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 3, mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.key as string}>{header.label}</TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.key as string}>{row[header.key]}</TableCell>
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

// Define the props for the ConfirmModal component.
interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

// A custom modal component to replace window.confirm() and alert()
export const ConfirmModal = ({ open, message, onConfirm, onClose }: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
        width: 400
      }}>
        <Typography id="confirmation-modal-title" variant="h6" component="h2" gutterBottom>
          Confirmation
        </Typography>
        <Typography id="confirmation-modal-description" sx={{ mt: 2, mb: 4 }}>
          {message}
        </Typography>
        <Button onClick={onConfirm} variant="contained" color="success" sx={{ mr: 2 }}>
          Confirm
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

// This is the main component you need to export and use.
export default function ConnectorsTab() {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // This useEffect hook is a placeholder for your actual data fetching logic.
  useEffect(() => {
    // In your actual code, you would call an API function like getConnectors() here.
    const mockData: Connector[] = [
      { id: '1', name: 'Salesforce Connector', sourceType: 'Salesforce' },
      { id: '2', name: 'MySQL Connector', sourceType: 'MySQL' },
    ];
    setConnectors(mockData);
  }, []);

  const showModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (modalAction) {
      modalAction();
    }
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDelete = (connector: Connector) => {
    showModal(
      `Are you sure you want to delete ${connector.name}?`,
      async () => {
        await deleteConnector(connector.id);
        // In a real app, you would re-fetch your data here to update the UI.
        console.log('Connector deleted. Refreshing data...');
      }
    );
  };

  const handleEdit = (connector: Connector) => {
    console.log(`Editing connector: ${connector.name}`);
  };

  const handleAdd = () => {
    console.log('Adding new connector...');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Connectors
      </Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Add New Connector
      </Button>
      <TabularContainer
        data={connectors}
        headers={connectorHeaders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ConfirmModal
        open={modalOpen}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
      />
    </Box>
  );
}

