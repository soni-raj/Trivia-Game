import React, { useEffect, useRef, useState } from "react";
import { db } from "../../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { Container, TextField, Button, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubble from "./ChatBubble";

// const ChatBox = ({ game_id, team_id }) => {
const ChatBox = () => {
  const game_id = '3445e433-e26a-4930-a86a-f0b4f6e246f1';
  const team_id = 'c38f9205-16dc-48fc-89ad-f1d49c3f57c8';
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
        }}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </Paper>
      <form
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
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </form>
    </Container>
  );
};

export default ChatBox;
