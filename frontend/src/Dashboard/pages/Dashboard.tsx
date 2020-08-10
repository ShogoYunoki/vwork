import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import clsx from "clsx";
import AppContext from "../../AppContext";

import Home from "./Home";
import MyTask from "../Task/pages/MyTask";
import MyAttendance from "../Attendance/pages/MyAttendance";
import EachProject from "../Project/pages/EachProject";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { fetchAsyncCurrentUser } from "../../Auth/authSlice";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../appSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleLoading(true));
    dispatch(fetchAsyncCurrentUser());
    dispatch(toggleLoading(false));
  }, [dispatch]);

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openTask, setOpenTask] = useState(false);
  const OpenTask = () => {
    setOpenTask(true);
  };
  const CloseTask = () => {
    setOpenTask(false);
  };

  return (
    <div className={classes.root}>
      <AppContext.Provider
        value={{
          handleDrawerOpen,
          handleDrawerClose,
          open,
          OpenTask,
          CloseTask,
          openTask,
        }}
      >
        <MainNavigation />
        <CssBaseline />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/my_task" exact>
              <MyTask />
            </Route>
            <Route path="/work_manage" exact>
              <MyAttendance />
            </Route>
            <Route path="/my_project" exact>
              <EachProject />
            </Route>
          </Switch>
        </main>
      </AppContext.Provider>
    </div>
  );
};

export default Dashboard;
