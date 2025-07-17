import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchGlobalTotalJobsSent, fetchGlobalTotalJobsFailed } from '../../services/api';

const GeneralDashboardCharts = () => {
  const [jobsSent, setJobsSent] = useState([]);
  const [jobsFailed, setJobsFailed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchGlobalTotalJobsSent(),
      fetchGlobalTotalJobsFailed(),
    ]).then(([sent, failed]) => {
      setJobsSent((sent || []).map(item => ({ client: item._id, jobsSent: item.total })));
      setJobsFailed((failed || []).map(item => ({ client: item._id, jobsFailed: item.total })));
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom>Global Trends</Typography>
      <Box display="flex" gap={2} flexWrap="wrap">
        <Paper sx={{ p: 2, flex: 1, minWidth: 350, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Jobs Sent per Client Overall</Typography>
          {loading ? <CircularProgress /> : jobsSent.length === 0 ? (
            <Typography>No data to display.</Typography>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobsSent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="client" />
                <YAxis width={80} tickFormatter={value => {
                  if (value >= 1e6) return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
                  if (value >= 1e3) return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
                  return value;
                }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobsSent" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
        <Paper sx={{ p: 2, flex: 1, minWidth: 350, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Jobs Failed per Client Overall</Typography>
          {loading ? <CircularProgress /> : jobsFailed.length === 0 ? (
            <Typography>No data to display.</Typography>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobsFailed}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="client" />
                <YAxis width={80} tickFormatter={value => {
                  if (value >= 1e6) return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
                  if (value >= 1e3) return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
                  return value;
                }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobsFailed" fill="#e53935" name="Jobs Failed" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default GeneralDashboardCharts; 