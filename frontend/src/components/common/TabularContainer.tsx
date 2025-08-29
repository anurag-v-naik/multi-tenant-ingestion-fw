import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TabularHeader } from '../../types';

// This is a placeholder for your actual data types
type Item = Record<string, any>;

interface TabularContainerProps {
  data: Item[];
  headers: TabularHeader[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
  renderExtraActions?: (item: Item) => React.ReactNode;
}

const TabularContainer = ({ data = [], headers = [], onEdit, onDelete, renderExtraActions }: TabularContainerProps) => {
  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <TableContainer component={Paper} elevation={3}>
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
              <TableRow key={row.id || index}>
                {headers.map((header) => (
                  <TableCell key={header.key as string}>{row[header.key]}</TableCell>
                ))}
                <TableCell align="right">
                  {renderExtraActions && renderExtraActions(row)}
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
    </Box>
  );
};

export default TabularContainer;

