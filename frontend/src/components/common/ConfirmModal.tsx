import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

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
        width: 400,
        boxShadow: 24
      }}>
        <Typography id="confirmation-modal-title" variant="h6" component="h2" gutterBottom>
          Confirmation
        </Typography>
        <Typography id="confirmation-modal-description" sx={{ mt: 2, mb: 4 }}>
          {message}
        </Typography>
        <Button onClick={onConfirm} variant="contained" color="primary" sx={{ mr: 2 }}>
          Confirm
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;

