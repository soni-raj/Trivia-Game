import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

import MenuItem from "@mui/material/MenuItem";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Groups3Icon from "@mui/icons-material/Groups3";
import {
  TRIVIA_GET_USER_DETAIL,
  TRIVIA_S3_OPERATIONS,
  TRIVIA_GET_ALL_USERS,
  TRIVIA_EDIT_USER_DETAIL,
  GET_USER_TEAMS_BY_EMAIL,
} from "../../utils/apiUrls";

export default function EditProfileComp() {
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [winLoss, setWinLoss] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [teamAffiliations, setTeamAffiliations] = useState([]);
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      let payload = base64EncodedImage.split(",")[1];
      await axios.post(TRIVIA_S3_OPERATIONS, {
        base64: payload,
        email: email,
      });
      loadUserImage();
    } catch (err) {
      handleSnackbarOpen("Failed Image size limited to 6mb");
    }
  };
  const loadUserImage = async () => {
    try {
      const currentUser = localStorage.getItem("email");
      const response = await axios.post(TRIVIA_S3_OPERATIONS, {
        email: currentUser,
      });

      const base64Image = response.data.base64;

      // convert base64 to raw binary data held in a string
      const byteCharacters = atob(base64Image);

      // convert that to a ArrayBuffer
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // create a blob and create an object URL
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const blobUrl = URL.createObjectURL(blob);

      setAvatar(blobUrl); // now avatar state contains a URL that can be used in an <img> tag
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("email");
    setCurrentUser(currentUser);
    axios
      .post(TRIVIA_GET_USER_DETAIL, { email: currentUser })
      .then((response) => response.data)
      .then((data) => {
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setGamesPlayed(data.games_played);
        setWinLoss(data.win_loss);
        setTotalPoints(data.total_points);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    loadUserImage();

    axios
      .post(GET_USER_TEAMS_BY_EMAIL, { email: currentUser })
      .then((response) => {
        const teams = response.data.teams;
        setTeamAffiliations(teams);
      })
      .catch((error) => console.error("Error:", error));
    const currentUserEmail = currentUser; // replace "userEmail" with the actual key you used to store the email
    axios
      .get(TRIVIA_GET_ALL_USERS)
      .then((response) => {
        const users = response.data.filter(
          (user) => user.email !== currentUserEmail
        );
        console.log(users);
        setAllUsers(users);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserEmail("");
    setSelectedUserDetails(null);
  };

  const handleUserSelect = (event) => {
    console.log(allUsers);
    setSelectedUserEmail(event.target.value);
    axios
      .post(TRIVIA_GET_USER_DETAIL, { email: event.target.value })
      .then((response) => setSelectedUserDetails(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const handleSubmit = (event) => {
    handleSnackbarOpen("success User info saved..");
    axios.post(TRIVIA_EDIT_USER_DETAIL, {
      email: currentUser,
      firstname: firstName,
      lastname: lastName,
    });
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const body = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h5">Compare Achievement</Typography>
      <br />
      <FormControl fullWidth>
        <TextField
          id="select-user"
          select
          label="Select User"
          value={selectedUserEmail}
          onChange={handleUserSelect}
        >
          {allUsers.map((user) => (
            <MenuItem key={user.email} value={user.email}>
              {user.firstname}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      {selectedUserDetails && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">You</TableCell>
                <TableCell align="right">
                  {selectedUserDetails.firstname}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Win/Loss
                </TableCell>
                <TableCell align="right">{winLoss}</TableCell>
                <TableCell align="right">
                  {selectedUserDetails.win_loss}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Games Played
                </TableCell>
                <TableCell align="right">{gamesPlayed}</TableCell>
                <TableCell align="right">
                  {selectedUserDetails.games_played}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Total Points
                </TableCell>
                <TableCell align="right">{totalPoints}</TableCell>
                <TableCell align="right">
                  {selectedUserDetails.total_points}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackbarMessage.trim().split(" ")[0].toLowerCase() === "success"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="form">
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Avatar
              alt="Remy Sharp"
              src={avatar}
              sx={{ width: 90, height: 90, marginLeft: "35%" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Button
              variant="contained"
              component="label"
              sx={{ marginRight: "35%", marginTop: "8%", width: "100%" }}
            >
              Upload Avatar
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              id="outlined-required"
              placeholder="First Name"
              label="First Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              required
              sx={{ width: "100%" }}
              id="outlined-required"
              placeholder="Last Name"
              label="Last Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              id="outlined-required"
              placeholder="xyz@gmail.com"
              label="Email"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              id="outlined-required"
              placeholder="Games Played"
              label="Games Played"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={gamesPlayed}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              id="outlined-required"
              placeholder="Win/Loss"
              label="Win/Loss"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={winLoss}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-required"
              placeholder="Total Points"
              label="Total Points"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={totalPoints}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <FormControl sx={{ width: "77%" }}>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
                endIcon={<Groups3Icon />}
                sx={{ width: "100%" }}
              >
                Team Affliations
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {teamAffiliations.map((item, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    {item.team_name}
                  </MenuItem>
                ))}

                {/* <MenuItem onClick={handleClose}>Team 1</MenuItem>
                <MenuItem onClick={handleClose}>Team 2</MenuItem>
                <MenuItem onClick={handleClose}>Team 3</MenuItem> */}
              </Menu>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Button
              variant="contained"
              component="label"
              onClick={handleOpenModal}
            >
              Compare Achievement
            </Button>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
            >
              {body}
            </Modal>
          </Grid>
        </Grid>
      </div>
      <br />
      <Button
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "#1D267D",
          color: "white",
          padding: {
            xs: "8px 75px",
            md: "8px 190px",
          },
          fontSize: "1rem",
          marginTop: "3px",
          letterSpacing: "3px",
          "&:hover": {
            bgcolor: "#0C134F", // Set your desired hover color here
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
