import React, { useState } from "react";
import Cookies from "js-cookie"; 

import { useNavigate } from 'react-router-dom';



import {
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";



function LoginForm() {
  const [checked, setChecked] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigated = useNavigate();

  const onSubmitSuccess = (jwtToken: any) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigated("/");
  };
  const onSubmitFailure = (errorMsg: any) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    const userDetails = { username, password };

    const loginUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const res = await fetch(loginUrl, options);
    const data = await res.json();

    if (res.ok) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="username"
              type="text"
              sx={{ m: 3 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              sx={{ m: 3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="keep logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              onClick={onSubmitForm}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Login
            </Button>
            {showSubmitError ? <Typography>{errorMsg}</Typography> :null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default LoginForm;
