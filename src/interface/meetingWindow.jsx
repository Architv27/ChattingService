import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ChatIcon from '@mui/icons-material/Chat';
// import { styled } from '@mui/material/styles';

const VideoChatLayout = () => {
    return (
      <div style={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'center', color: 'text.secondary' }}>
              <VideoCallIcon sx={{ fontSize: 50 }} />
              <Typography variant="h5" component="h2">
                Video Call
              </Typography>
              <Typography variant="body1" gutterBottom>
                Experience high-quality video calls with your team.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ margin: 1 }}
                href="/video-call"
              >
                Start Video Call
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'center', color: 'text.secondary' }}>
              <MeetingRoomIcon sx={{ fontSize: 50 }} />
              <Typography variant="h5" component="h2">
                Meeting Room
              </Typography>
              <Typography variant="body1" gutterBottom>
                Join or create a meeting room for your team.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ margin: 1 }}
                href="/meeting-room"
              >
                Join Meeting Room
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'center', color: 'text.secondary' }}>
              <ChatIcon sx={{ fontSize: 50 }} />
              <Typography variant="h5" component="h2">
                Chat
              </Typography>
              <Typography variant="body1" gutterBottom>
                Engage in real-time conversations with your team.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ margin: 1 }}
                href="/chat"
              >
                Start Chat
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  };

export default VideoChatLayout;