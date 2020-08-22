import React, { FC, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Color from "../../../shared/util/color";
import { useDispatch, useSelector } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import { setSelectedTask } from "../../Task/taskSlice";
import { toggleTaskCardClicked } from "../../../appSlice";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import Card from "@material-ui/core/Card";
import {
  fetchAsyncGetNotifications,
  fetchAsyncUpdateNotification,
} from "../notificationSlice";
import { selectUser, selectWorkspace } from "../../../Auth/authSlice";
import { setSelectedMembers } from "../../dashboardSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      borderRadius: 10,
      height: 80,
      marginBottom: 15,
      cursor: "pointer",
    },
    cardActionArea: {
      height: 80,
    },
    avatar: {
      backgroundColor: Color.VWORK_RED,
    },
  })
);

interface NotificationItemProps {
  data: {
    _id: string;
    createdAt: string;
    type: number;
    unread: boolean;
    task: {
      _id: string;
      name: string;
      project: { name: string };
    };
  };
}

const NotificationItem: FC<NotificationItemProps> = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const workspaceId = useSelector(selectWorkspace);
  const user = useSelector(selectUser);

  const updateNotification = useCallback(async () => {
    await dispatch(
      fetchAsyncUpdateNotification({
        workspaceId,
        notificationId: data._id,
        bodyData: { unread: false },
      })
    );
    await dispatch(fetchAsyncGetNotifications(workspaceId));
  }, [dispatch, workspaceId, data]);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea
          className={classes.cardActionArea}
          onClick={() => {
            updateNotification();
            dispatch(setSelectedMembers([user]));
            dispatch(setSelectedTask(data.task._id));
            dispatch(toggleTaskCardClicked(true));
          }}
          data-testid="test"
        >
          <Grid
            container
            alignItems="center"
            style={{ height: 80, padding: "10px", boxSizing: "border-box" }}
            spacing={2}
          >
            <Grid item xs={7}>
              <Grid
                container
                wrap="nowrap"
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  {data.unread ? (
                    <FiberNewIcon color="primary" fontSize="large" />
                  ) : (
                    <CheckCircleIcon color="disabled" fontSize="large" />
                  )}
                </Grid>
                <Grid item>
                  <Typography variant="body1">{data.task.name}</Typography>
                  {data.type === 1 ? (
                    <Typography variant="body1">
                      新着のコメントがあります。
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      タスク情報が更新されました。
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs alignItems="center" justify="center">
              <Grid item>
                {data.task.project && data.task.project.name ? (
                  <Chip
                    label={data.task.project.name}
                    variant="outlined"
                    color="secondary"
                  />
                ) : (
                  <Chip label="プロジェクト未選択" variant="outlined" />
                )}
              </Grid>
            </Grid>
            <Grid item container xs alignItems="center" spacing={1}>
              <Grid item>
                <Typography>
                  {data.createdAt
                    ? moment(data.createdAt).format("YYYY/MM/DD HH:mm")
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  );
};

export default NotificationItem;
