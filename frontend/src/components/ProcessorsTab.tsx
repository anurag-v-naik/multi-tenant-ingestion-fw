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

// These are placeholder functions for demonstration purposes.
const deleteProcessors = async (id: string | number) => {
  console.log(`Deleting processor with ID: ${id}`);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

// Define the Processor type to ensure type safety.
interface Processor {
  id: string | number;
  name: string;
  processorType: string;
  // Add other properties that exist on your processor objects
}

// Define the type for the table headers, ensuring 'key' is a valid property of Processor.
interface TabularHeader {
  key: keyof Processor;
  label: string;
}

const processorHeaders: TabularHeader[] = [
  { key: 'name', label: 'Name' },
  { key: 'processorType', label: 'Processor Type' },
  // Add other headers that match your Processor properties
];

const TabularContainer = ({ data, headers, onEdit, onDelete }: {
  data: Processor[],
  headers: TabularHeader[],
  onEdit: (processor: Processor) => void,
  onDelete: (processor: Processor) => void,
}) => {
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
const ConfirmModal = ({ open, message, onConfirm, onClose }: ConfirmModalProps) => {
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
export default function ProcessorsTab() {
  const [processors, setProcessors] = useState<Processor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // This useEffect hook is a placeholder for your actual data fetching logic.
  useEffect(() => {
    // In your actual code, you would call an API function like getProcessors() here.
    const mockData: Processor[] = [
      { id: 1, name: 'Data Transformer', processorType: 'Transform' },
      { id: 2, name: 'Data Validator', processorType: 'Validate' },
    ];
    setProcessors(mockData);
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

  const handleDelete = (processor: Processor) => {
    showModal(
      `Are you sure you want to delete ${processor.name}?`,
      () => {
        deleteProcessors(processor.id);
        console.log('Processor deleted. Refreshing data...');
      }
    );
  };

  const handleEdit = (processor: Processor) => {
    console.log(`Editing processor: ${processor.name}`);
  };

  const handleAdd = () => {
    console.log('Adding new processor...');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Processors
      </Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Add New Processor
      </Button>
      <TabularContainer
        data={processors}
        headers={processorHeaders}
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

