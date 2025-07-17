import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ChatBox = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box display="flex" gap={2} mt={2}>
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        placeholder="Ask a question..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <Button variant="contained" onClick={handleSend} disabled={loading || !input.trim()}>
        Send
      </Button>
    </Box>
  );
};

export default ChatBox; 