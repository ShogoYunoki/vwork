import React, { useCallback, useEffect, useRef } from "react";
import AddButtonInProject from "../components/AddButtonInProject";
import ProjectMemberList from "../components/ProjectMemberList";
import TaskList from "../../Task/components/TaskList";
import MainHeader from "../../../shared/components/Navigation/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncGetProject, selectProject } from "../projectSlice";
import { useParams } from "react-router-dom";
import { fetchAsyncProjectTasks, selectTasks } from "../../Task/taskSlice";
import { setSelectedMembers } from "../../dashboardSlice";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const Project = () => {
  const dispatch = useDispatch();

  const project = useSelector(selectProject);
  const tasks = useSelector(selectTasks);

  interface PraramsType {
    projectId: string;
  }
  const projectId = useParams<PraramsType>().projectId;

  const getProject = useCallback(
    async (projectId) => {
      await dispatch(fetchAsyncGetProject(projectId));
    },
    [dispatch]
  );

  const getTasks = useCallback(
    async (projectId) => {
      await dispatch(fetchAsyncProjectTasks(projectId));
    },
    [dispatch]
  );

  const setMembers = useCallback(
    (members) => {
      dispatch(setSelectedMembers(members));
    },
    [dispatch]
  );

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      setMembers(project.members);
    } else {
      mounted.current = true;
    }
  }, [setMembers, project]);

  useEffect(() => {
    getProject(projectId);
    getTasks(projectId);
  }, [getProject, getTasks, projectId]);

  return (
    <>
      <Container>
        <MainHeader title="UI改修" />
        <AddButtonInProject />
        <Grid container direction="row" justify="space-between">
          <Grid item style={{ width: "70%" }}>
            <TaskList title="タスク一覧" taskData={tasks.data} />
          </Grid>
          <Grid item>
            <ProjectMemberList members={project.members} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Project;
