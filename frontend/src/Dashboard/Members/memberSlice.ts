import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const token = localStorage.token;

//　メンバー管理のメンバー一覧
export const fetchAsyncGetMembers = createAsyncThunk(
  "member/all",
  async (workspaceId: string) => {
    const res = await axios.get(
      `${apiUrl}api/v1/workspaces/${workspaceId}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

// メンバー管理のメンバー詳細(ユーザー選択後の名前、email、役職の取得)
// userとprofile情報を返す
export const fetchAsyncGetMember = createAsyncThunk(
  "member/single",
  async (data: { workspaceId: string; id: string }) => {
    const res = await axios.get(
      `${apiUrl}api/v1/workspaces/${data.workspaceId}/users/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

interface memberState {
  members: {
    name: string;
    email: string;
    _id: string;
  }[];
  member: {
    user: {};
    profile: {};
  };
}

const initialState: memberState = {
  members: [],
  member: {
    user: {},
    profile: {},
  },
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers(state, action) {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMembers.fulfilled, (state, action) => {
      // console.log(action.payload.users);
      // console.log(state.members);
      state.members = action.payload.users;
    });
    builder.addCase(fetchAsyncGetMember.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const selectMembers = (state: RootState) => state.member.members;
export const { setMembers } = memberSlice.actions;

export default memberSlice.reducer;
