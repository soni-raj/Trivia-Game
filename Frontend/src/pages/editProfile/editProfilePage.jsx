import React from "react";
import { Grid, Box, TextField, Typography } from "@mui/material";

function EditProfilePage() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={6} lg={4}>
        <Box
          sx={{
            width: "100%",
            border: 1,
            borderColor: "divider",
            padding: 2,
            borderRadius: 1,
            backgroundColor: "#fcf9f8",
          }}
        >
          <Typography variant="h3">Edit Profile</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditProfilePage;
