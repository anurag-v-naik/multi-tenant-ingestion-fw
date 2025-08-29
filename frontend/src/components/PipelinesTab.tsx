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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';

// These are placeholder functions for demonstration purposes.
// In your actual application, you would import these from an API module.
const runPipeline = async (id: string | number) => {
  console.log(`Running pipeline with ID: ${id}`);
  // Simulate an API call
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

const deletePipelines = async (id: string | number) => {
  console.log(`Deleting pipeline with ID: ${id}`);
  // Simulate an API call
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

// Define the Pipeline type to ensure type safety.
interface Pipeline {
  id: string | number;
  name: string;
  scheduleType: string;
  // Add other properties that exist on your pipeline objects
}

// Define the type for the table headers.
interface TabularHeader {
  key: keyof Pipeline;
  label: string;
}

const pipelineHeaders: TabularHeader[] = [
  { key: 'name', label: 'Name' },
  { key: 'scheduleType', label: 'Schedule Type' },
  // Add other headers that match your Pipeline properties
];

const TabularContainer = ({ data, headers, onEdit, onDelete, onRun }: {
  data: Pipeline[],
  headers: TabularHeader[],
  onEdit: (pipeline: Pipeline) => void,
  onDelete: (pipeline: Pipeline) => void,
  onRun: (pipeline: Pipeline) => void,
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
                <IconButton onClick={() => onRun(row)} color="success">
                  <PlayArrowIcon />
                </IconButton>
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
export default function PipelinesTab() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // This useEffect hook is a placeholder for your actual data fetching logic.
  useEffect(() => {
    // In your actual code, you would call an API function like getPipelines() here.
    const mockData: Pipeline[] = [
      { id: 1, name: 'Sales Data Ingestion', scheduleType: 'Daily' },
      { id: 2, name: 'Web Analytics ETL', scheduleType: 'Hourly' },
    ];
    setPipelines(mockData);
  }, []);

  const showModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action); // Use a function to set the state
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

  const handleRun = (pipeline: Pipeline) => {
    showModal(
      `Are you sure you want to run ${pipeline.name}?`,
      () => {
        // Now calling the function with the ID inside the modal's confirmation
        runPipeline(pipeline.id);
        console.log('Pipeline execution triggered successfully!');
      }
    );
  };

  const handleDelete = (pipeline: Pipeline) => {
    showModal(
      `Are you sure you want to delete ${pipeline.name}?`,
      () => {
        deletePipelines(pipeline.id);
        // After deletion, you would re-fetch your data here to update the UI.
        console.log('Pipeline deleted. Refreshing data...');
      }
    );
  };

  const handleEdit = (pipeline: Pipeline) => {
    console.log(`Editing pipeline: ${pipeline.name}`);
  };

  const handleAdd = () => {
    console.log('Adding new pipeline...');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pipelines
      </Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Add New Pipeline
      </Button>
      <TabularContainer
        data={pipelines}
        headers={pipelineHeaders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRun={handleRun}
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

