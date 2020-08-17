import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncCurrentUser,
  selectErrorMessage,
  setErrorOpen,
  selectErrorOpen,
} from "../authSlice";
import { toggleLoading } from "../../appSlice";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Auth = () => {
  const dispatch = useDispatch();

  const token = localStorage.token;

  useEffect(() => {
    if (token) {
      dispatch(toggleLoading(true));
      dispatch(fetchAsyncCurrentUser());
      dispatch(toggleLoading(false));
    }
  }, [dispatch, token]);

  const errorMessage = useSelector(selectErrorMessage);
  const errorOpen = useSelector(selectErrorOpen);

  const handleClose = () => {
    dispatch(setErrorOpen(false));
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Switch>
        <Route exact path="/auth/signup">
          <SignUp />
        </Route>
        <Route exact path="/auth/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
};

export default Auth;
