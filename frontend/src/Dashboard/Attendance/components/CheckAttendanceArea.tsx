import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import NewTaskAddAfterWorkDrawer from "../../Task/components/TaskAddButtonAfetrWorkDrawer";
import AddedTaskTextAfterWorkDrawer from "../../Task/components/AddedTaskTextAfterWorkDrawer";
import {
  selectAddButtonAfterTask,
  selectAddedTaskText,
  toggleAddedTaskText,
  toggleAddButtonAfterTask,
} from "../../../appSlice";
import "../../../App.css";
import Color from "../../../shared/util/color";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainTitle: {
      width: "30%",
      fontSize: 23,
    },
    root: {
      borderRadius: 10,
      backgroundColor: Color.VWORK_LIGHT_BLUE,
      marginTop: 25,
    },
    title: {
      fontSize: 18,
    },
    timeArea: {
      width: "100%",
      fontSize: 18,
    },
    appBar: {
      position: "relative",
      backgroundColor: Color.VWORK_BLACK,
      boxShadow: "none",
    },
    dialogTitle: {
      fontSize: 30,
      paddingLeft: 2,
    },
    dialogText: {
      fontSize: 20,
    },
    additionalButton: {
      borderRadius: 10,
      width: "10%",
      fontSize: 20,
    },
    addedTask: {
      fontSize: 30,
      cursor: "pointer",
    },
    todayUpdate: {
      marginBottom: 10,
    },
    textField: {
      width: "85%",
    },
    out: {
      borderRadius: 10,
      width: 150,
      fontSize: 20,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheckAttendanceArea = () => {
  const classes = useStyles();
  const moment = require("moment");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setStep({
      ...step,
      restStart: true,
      restEnd: true,
      finished: true,
    });
    setFinishedTime(moment().format("HH:mm"));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [step, setStep] = useState({
    attended: false,
    restStart: true,
    restEnd: true,
    finished: true,
  });

  const attendedClicked = () => {
    setStep({
      ...step,
      attended: true,
      restStart: false,
      finished: false,
    });
    setAttendedTime(moment().format("HH:mm"));
  };

  const restStartedClicked = () => {
    setStep({
      ...step,
      restStart: true,
      restEnd: false,
      finished: false,
    });
    setRestInTime(moment().format("HH:mm"));
  };

  const restEndClicked = () => {
    setStep({
      ...step,
      restEnd: true,
      finished: false,
    });
    setRestOutTime(moment().format("HH:mm"));
  };

  const [attendedTime, setAttendedTime] = useState();

  const [restInTime, setRestInTime] = useState();

  const [restOutTime, setRestOutTime] = useState();

  const [finishedTime, setFinishedTime] = useState();

  const history = useHistory();
  const pageChangeHandler = () => {
    history.push("/");
    history.go(0);
  };

  const dispatch = useDispatch();
  const addButtonAfterTask = useSelector(selectAddButtonAfterTask);
  const addedTaskText = useSelector(selectAddedTaskText);

  return (
    <>
      <Box borderBottom={1} className={classes.mainTitle}>
        勤怠管理
      </Box>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            2020年8月10日
          </Typography>
          <Grid container direction="row" className={classes.timeArea}>
            <Grid item style={{ width: "20%" }}>
              <span style={{ fontWeight: 600 }}>出社</span>：{attendedTime}
            </Grid>
            <Grid item style={{ width: "20%" }}>
              {step.attended === false ? (
                <Grid item>
                  <span style={{ fontWeight: 600 }}>休憩</span>：
                </Grid>
              ) : (
                <Grid item>
                  <span style={{ fontWeight: 600 }}>休憩</span>：{restInTime} ~
                  {restOutTime}
                </Grid>
              )}
            </Grid>
            <Grid item style={{ width: "20%" }}>
              <span style={{ fontWeight: 600 }}>退社</span>：{finishedTime}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container direction="row" justify="flex-end">
            <Box mr={1}>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled={step.attended}
                  onClick={attendedClicked}
                >
                  出社
                </Button>
              </Grid>
            </Box>
            <Box mr={1}>
              <Grid item>
                {step.restStart === false || step.restEnd === true ? (
                  <Button
                    size="small"
                    variant="contained"
                    disabled={step.restStart}
                    color="primary"
                    onClick={restStartedClicked}
                  >
                    休憩
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    disabled={step.restEnd}
                    color="secondary"
                    onClick={restEndClicked}
                  >
                    休憩終了
                  </Button>
                )}
              </Grid>
            </Box>
            <Box mr={1}>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                  disabled={step.finished}
                >
                  退社
                </Button>
              </Grid>
            </Box>
          </Grid>
        </CardActions>
      </Card>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo192.png`}
              style={{ height: 25 }}
              className="imgstyle"
              alt="icon"
            />
            <Typography variant="h6" className={classes.dialogTitle}>
              VWORK
            </Typography>
          </Toolbar>
        </AppBar>
        <Box mt={10}>
          <Grid container direction="column" className={classes.dialogText}>
            <Container maxWidth="lg">
              <Grid item>勤務お疲れさまでした</Grid>
              <Box mt={7}>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>今日行ったタスクの確認をして下さい。</Grid>
                    <Box mt={3}>
                      <Grid item>
                        <Button
                          className={classes.additionalButton}
                          onClick={() =>
                            dispatch(toggleAddButtonAfterTask(true))
                          }
                          variant="contained"
                          color="secondary"
                        >
                          追加
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={3}>
                <Grid
                  item
                  className={classes.addedTask}
                  onClick={() => dispatch(toggleAddedTaskText(true))}
                >
                  X件のタスクを追加済
                </Grid>
              </Box>
              <Grid item>
                <Box mt={12}>
                  <Grid container direction="column">
                    <Grid item className={classes.todayUpdate}>
                      今日の振り返り
                    </Grid>
                    <Grid item>
                      <TextField
                        multiline
                        rows={8}
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Box mt={10} mr={4}>
                  <Grid container direction="row" justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.out}
                      onClick={pageChangeHandler}
                    >
                      退勤する
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Container>
          </Grid>
        </Box>
        {addButtonAfterTask ? <NewTaskAddAfterWorkDrawer /> : ""}

        {addedTaskText ? <AddedTaskTextAfterWorkDrawer /> : ""}
      </Dialog>
    </>
  );
};

export default CheckAttendanceArea;
