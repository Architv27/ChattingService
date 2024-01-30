import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

const ChatWindow = () => {
  return (
    <div sx={{ width: '100%', maxWidth: 360, backgroundColor: 'background.paper' }}>
      <List>
        {/* Render chat messages here */}
        <ListItem>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <ListItemText primary="Brunch this weekend?" secondary="Ali Connors" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <TextField
            id="outlined-full-width"
            label="Message"
            sx={{ margin: 2 }} // Example of using sx prop
            placeholder="Type your message here"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <IconButton edge="end" color="primary" aria-label="send">
            <SendIcon />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
};

export default ChatWindow;
