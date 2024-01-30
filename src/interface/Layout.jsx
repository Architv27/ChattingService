import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // Ensure correct import for icons
import { Link } from 'react-router-dom';
import ChatWindow from './ChatWindow'; // Import ChatWindow component
import VideoChatLayout from './meetingWindow';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" style={{ fontFamily: 'sans-serif', background: 'black' }}>
        <Toolbar style={{ fontFamily: 'sans-serif', color: 'black', textAlign:"center" }}>
          <IconButton edge="start" style={{ marginRight: 2, color:"white" }} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'sans-serif', color:"white" }}>
            PEER CALLS
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <VideoChatLayout />
        {/* <ChatWindow /> Use ChatWindow component */}
      </div>
      {children}
    </div>
  );
};

export default Layout;