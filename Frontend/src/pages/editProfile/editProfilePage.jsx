import React from "react";
import { Grid, Box, TextField, Typography } from "@mui/material";
import EditProfileComp from "../../Components/editProfile/editProfileComp";

function EditProfilePage() {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-left-div">
          <div className="register-form">
            <EditProfileComp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
