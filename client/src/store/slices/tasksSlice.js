import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';
const TASK_SLICE_NAME = 'tasks';

const initialState = {
  tasks: [],
  isFetching: false,
  error: null,
};

export const getUserTasksThunk = createAsyncThunk(
  `${TASK_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getUserTasks(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createTasksThunk = createAsyncThunk(
  `${TASK_SLICE_NAME}/create`,
  async ({ userId, values }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createUserTasks(userId, values);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUserTaskThunk = createAsyncThunk(
  `${TASK_SLICE_NAME}/delete`,
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      await API.deleteUserTask(userId, taskId);
      return taskId;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const taskSlice = createSlice({
  name: TASK_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    builder.addCase(getUserTasksThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserTasksThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tasks = payload;
    });
    builder.addCase(getUserTasksThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
    builder.addCase(createTasksThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createTasksThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tasks.push(payload);
    });
    builder.addCase(createTasksThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
    builder.addCase(deleteUserTaskThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteUserTaskThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.tasks = state.tasks.filter(t => t.id !== payload);
    });
    builder.addCase(deleteUserTaskThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = taskSlice;

export default reducer;
