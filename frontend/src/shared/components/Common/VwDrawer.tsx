import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Backdrop from "@material-ui/core/Backdrop";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const DrawerWith = "50%";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    drawer: {
      width: DrawerWith,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DrawerWith,
    },
    workSpaceIcon: {
      marginTop: 10,
    },
  })
);

const VwDrawer = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={props.open}
        onClick={props.click}
      >
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {props.children}
        </Drawer>
      </Backdrop>
    </>
  );
};

export default VwDrawer;