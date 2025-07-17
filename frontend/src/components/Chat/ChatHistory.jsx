import React from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const ChatHistory = ({ messages, loading }) => {
  return (
    <Box
      mt={2}
      mb={2}
      sx={{
        maxHeight: 350, // or any height you prefer
        overflowY: 'auto',
        pr: 1, // padding for scrollbar
        background: '#fafafa',
        borderRadius: 2,
      }}
    >
      {messages.map((msg, idx) => (
        <Box key={idx} display="flex" justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'} mb={1}>
          <Paper sx={{ p: 2, maxWidth: '70%', bgcolor: msg.role === 'user' ? 'primary.light' : 'grey.100' }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{msg.content}</Typography>
          </Paper>
        </Box>
      ))}
      {loading && (
        <Box display="flex" justifyContent="flex-start" mb={1}>
          <Paper sx={{ p: 2, maxWidth: '70%', bgcolor: 'grey.100' }}>
            <CircularProgress size={20} />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ChatHistory; 