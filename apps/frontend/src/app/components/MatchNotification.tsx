'use client';

import { Paper, Typography, Button, Box } from '@mui/material';

interface MatchNotificationProps {
  onOkay: () => void;
}

const MatchNotification: React.FC<MatchNotificationProps> = ({ onOkay }) => {
  return (
    <Paper elevation={3} sx={{ padding: '32px', textAlign: 'center' }}>
      <Typography variant="h4" component="div" gutterBottom>
        You got match!
      </Typography>
      <Box sx={{ marginTop: '16px' }}>
        <Button variant="contained" onClick={onOkay}>
          Okay
        </Button>
      </Box>
    </Paper>
  );
};

export default MatchNotification;