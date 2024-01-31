import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, Link } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import VideoChatLayout from './meetingWindow'; // Assuming this is your main or home page

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" style={{ fontFamily: 'sans-serif', background: 'black', textAlign:"center" }}>
        <Toolbar style={{ fontFamily: 'sans-serif', color: 'black' }}>
          <IconButton edge="start" style={{ marginRight: 2, color: "white" }} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'sans-serif', color: "white" }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>PEER CALLS</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<VideoChatLayout/>} />
          <Route path="/chat" element={<ChatWindow />} />
          <Route path="/create-or-join" element={<div>Create OR Join Room</div>} />
          {/* Define more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
