import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";

const ChatBubble = ({ message }) => {
  const user = localStorage.getItem("email");

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: message.name === user ? "flex-end" : "flex-start",
        margin: "10px",
        padding: "10px",
        backgroundColor: message.name === user ? "#E0F2FE" : "#F3F3F3",
      }}
    >
      {message.name !== user && (
        <Avatar
          src={message.avatar}
          alt="user avatar"
          sx={{ marginRight: "10px" }}
        />
      )}
      <div>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {message.name}
        </Typography>
        <Typography variant="body1">{message.text}</Typography>
      </div>
    </Paper>
  );
};

export default ChatBubble;
