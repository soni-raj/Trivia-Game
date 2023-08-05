import React, { useEffect, useRef, useState } from "react";
import { db } from "../../utils/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { Container, TextField, Button, Paper, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubble from "./ChatBubble";

const ChatBox = ({ game_id, team_id }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "games", game_id, "teams", team_id, "chat_messages"),
      orderBy("createdAt", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const user = localStorage.getItem("email");

    await addDoc(
      collection(db, "games", game_id, "teams", team_id, "chat_messages"),
      {
        text: message,
        name: user,
        createdAt: serverTimestamp(),
        avatar: "https://i.pravatar.cc/150?u=" + user,
      }
    );

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "400px",
          width: "100%",
          overflowY: "auto",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </Paper>
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginRight: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ChatBox;
