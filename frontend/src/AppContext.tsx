import React, { createContext } from "react";

interface AppContextInterface {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  open: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menu: null;
  HandleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  HandleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  AvatarMenu: null;
  OpenTask: () => void;
  CloseTask: () => void;
  openTask: boolean;
  OpenProject: () => void;
  CloseProject: () => void;
  openProject: boolean;
  OpenMember: () => void;
  CloseMember: () => void;
  openMember: boolean;
  OpenProfile: () => void;
  CloseProfile: () => void;
  openProfile: boolean;
  handleOpenHandler: () => void;
  handleCloseHandler: () => void;
  openDrawer: boolean;
  handleOpenAddButton: () => void;
  handleCloseAddButton: () => void;
  addButton: boolean;
  handleAttendanceCardOpen: () => void;
  handleAttendanceCardClose: () => void;
  attendanceCard: boolean;
  handleAddTaskButtonAfterWorkOpen: () => void;
  handleAddTaskButtonAfterWorkClose: () => void;
  addButtonAfterTask: boolean;
  handleAddedTaskTextOpen: () => void;
  handleAddedTaskTextClose: () => void;
  addedTaskText: boolean;
  handleAddProjectMemberOpen: () => void;
  handleAddProjectMemberClose: () => void;
  addProjectMember: boolean;
  projectMemberDrawerOpen: () => void;
  projectMemberDrawerClose: () => void;
  projectMember: boolean;
}

const AppContext = createContext<AppContextInterface | any>(null);

export default AppContext;
