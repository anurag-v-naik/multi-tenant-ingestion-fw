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
// In your actual application, you would import these from an API module.
const getSchedules = async () => {
  // Simulate an API call
  const mockData = [
    { id: 1, name: 'Daily Reports', cron_syntax: '0 8 * * *', pipeline_id: 'pipeline-1' },
    { id: 2, name: 'Hourly Sync', cron_syntax: '0 * * * *', pipeline_id: 'pipeline-2' },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(mockData), 1000));
};

const deleteSchedule = async (id: string | number) => {
  console.log(`Deleting schedule with ID: ${id}`);
  // Simulate an API call
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

// Define the Schedule type to ensure type safety.
interface Schedule {
  id: string | number;
  name: string;
  pipeline_id: string;
  cron_syntax: string;
  // Add other properties that exist on your schedule objects
}

// Define the type for the table headers, ensuring 'key' is a valid property of Schedule.
interface TabularHeader {
  key: keyof Schedule;
  label: string;
}

const scheduleHeaders: TabularHeader[] = [
  { key: 'name', label: 'Name' },
  { key: 'pipeline_id', label: 'Pipeline ID' },
  { key: 'cron_syntax', label: 'Cron Syntax' },
];

const TabularContainer = ({ data, headers, onEdit, onDelete, onAdd }: {
  data: Schedule[],
  headers: TabularHeader[],
  onEdit: (schedule: Schedule) => void,
  onDelete: (schedule: Schedule) => void,
  onAdd: () => void,
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

const SchedulesTab = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const data = await getSchedules() as Schedule[];
    setSchedules(data);
  };

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

  const handleAdd = () => {
    console.log('Adding new schedule...');
  };

  const handleEdit = (schedule: Schedule) => {
    console.log(`Editing schedule: ${schedule.name}`);
  };

  const handleDelete = (schedule: Schedule) => {
    showModal(
      `Are you sure you want to delete ${schedule.name}?`,
      async () => {
        await deleteSchedule(schedule.id);
        fetchSchedules();
      }
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Schedules
      </Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Add New Schedule
      </Button>
      <TabularContainer
        data={schedules}
        headers={scheduleHeaders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      <ConfirmModal
        open={modalOpen}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
      />
    </Box>
  );
};

export default SchedulesTab;

