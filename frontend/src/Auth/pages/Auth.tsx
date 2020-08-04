import React from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";
import Regist from "./Regist";

const Auth = () => {
  console.log("this is auth");
  return (
    <div>
      <Switch>
        <Route exact path="/auth/signup">
          <SignUp />
        </Route>
        <Route exact path="/auth/login">
          <Login />
        </Route>
        <Route exact path="/auth/regist">
          <Regist />
        </Route>
      </Switch>
    </div>
  );
};

export default Auth;
