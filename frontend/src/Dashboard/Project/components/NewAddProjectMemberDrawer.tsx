import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddMemberList from "./AddMemberList";
import Button from "@material-ui/core/Button";
import VwDrawer from "../../../shared/components/Common/VwDrawer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddMemberButton,
  toggleAddMemberButton,
} from "../../../appSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeIcon: {
      padding: 0,
    },
    drawerTitle: {
      fontSize: 25,
      width: "85%",
    },
    button: {
      width: 300,
    },
  })
);

const NewAddProjectMemberDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addMemberButton = useSelector(selectAddMemberButton);
  return (
    <>
      <VwDrawer open={addMemberButton}>
        <Container maxWidth="md">
          <Box mt={2}>
            <IconButton
              onClick={() => dispatch(toggleAddMemberButton(false))}
              className={classes.closeIcon}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box borderBottom={1} mt={10} mb={5} className={classes.drawerTitle}>
            メンバー
          </Box>
          <AddMemberList />
          <Box mt={40} ml={35}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              招待
            </Button>
          </Box>
        </Container>
      </VwDrawer>
    </>
  );
};

export default NewAddProjectMemberDrawer;
