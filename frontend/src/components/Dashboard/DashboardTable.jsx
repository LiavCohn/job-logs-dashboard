import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, TablePagination, TableSortLabel
} from '@mui/material';

const headCells = [
  { id: 'transactionSourceName', label: 'Client' },
  { id: 'country_code', label: 'Country' },
  { id: 'TOTAL_JOBS_SENT_TO_INDEX', label: 'Jobs Sent', nested: true },
  { id: 'TOTAL_JOBS_FAIL_INDEXED', label: 'Jobs Failed', nested: true },
  { id: 'timestamp', label: 'Timestamp' },
];

const DashboardTable = ({ jobLogs, total, loading, page, limit, sortField, sortOrder, onPageChange, onRowsPerPageChange, onRequestSort }) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                <TableSortLabel
                  active={sortField === (headCell.nested ? `progress.${headCell.id}` : headCell.id)}
                  direction={sortField === (headCell.nested ? `progress.${headCell.id}` : headCell.id) ? sortOrder : 'asc'}
                  onClick={createSortHandler(headCell.nested ? `progress.${headCell.id}` : headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          ) : jobLogs && jobLogs.length > 0 ? (
            jobLogs.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.transactionSourceName}</TableCell>
                <TableCell>{row.country_code}</TableCell>
                <TableCell>{row.progress?.TOTAL_JOBS_SENT_TO_INDEX ?? '--'}</TableCell>
                <TableCell>{row.progress?.TOTAL_JOBS_FAIL_INDEXED ?? '--'}</TableCell>
                <TableCell>{row.timestamp ? new Date(row.timestamp).toLocaleString() : '--'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography>No data found.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </TableContainer>
  );
};

export default DashboardTable; 