import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ProjectMemberItem from "./ProjectMemberItem";
import Drawer from "@material-ui/core/Drawer";
import Backdrop from "@material-ui/core/Backdrop";
import Container from "@material-ui/core/Container";
import AddMemberList from "./AddMemberList";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Color from "../../../shared/util/color";

const drawerWidth = "55%";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 23,
      width: 300,
      marginTop: "15%",
      marginBottom: "2%",
    },
    icon: {
      fontSize: 45,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    drawerTitle: {
      fontSize: 25,
      width: "85%",
      marginTop: "8%",
      marginBottom: "4%",
    },
    closeIcon: {
      marginTop: "2%",
    },
    button: {
      marginTop: "30%",
      marginLeft: "30%",
      backgroundColor: Color.VWORK_RED,
      color: Color.VWORK_WHITE,
      width: 300,
    },
  })
);

const programDate = [
  { name: "柚木将吾", icon: "S" },
  { name: "柚木祐輔", icon: "Y" },
  { name: "柚木郁美", icon: "I" },
];

const ProjectMemberList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box borderBottom={1} className={classes.title}>
        メンバー
      </Box>
      <Grid container direction="column" justify="flex-start">
        <Grid item>
          <ListItem
            button
            onClick={handleDrawerOpen}
            style={{ paddingLeft: 0 }}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="メンバーを追加" />
          </ListItem>
        </Grid>
        <Grid item>
          {programDate.map((date, index) => {
            return (
              <ProjectMemberItem
                name={date.name}
                icon={date.icon}
                key={index}
              />
            );
          })}
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={open}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Container maxWidth="md">
            <IconButton onClick={handleClose} className={classes.closeIcon}>
              <CloseIcon />
            </IconButton>
            <Box borderBottom={1} className={classes.drawerTitle}>
              メンバー
            </Box>
            <AddMemberList />
            <Button variant="contained" className={classes.button}>
              招待
            </Button>
          </Container>
        </Drawer>
      </Backdrop>
    </>
  );
};

export default ProjectMemberList;