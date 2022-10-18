import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, ref, remove, set, update } from 'firebase/database';
import db from '../../database/config';

export const getUsers = createAsyncThunk('users/load', async () => {
  let users = [];
  const snapshot = await get(ref(db, 'users'));
  if (snapshot.exists()) users = Object.values(snapshot.val());

  return users;
});

export const addUser = createAsyncThunk('users/add', async (user, { getState }) => {
  const { users = [] } = getState().users;

  if (users.find(u => u.email === user.email))
    throw new Error('User email already exists');

  await set(ref(db, `users/${user.id}`), user);
  return user;
});

export const editUser = createAsyncThunk('users/edit', async (user, { getState }) => {
  const { users = [] } = getState().users;

  if (users.find(u => u.email === user.email && u.id !== user.id))
    throw new Error('User email already exists');

  await update(ref(db, `users/${user.id}`), user);
  return user;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await remove(ref(db, `users/${id}`));
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });

    builder.addCase(editUser.fulfilled, (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[index] = action.payload;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    });
  },
});

export default usersSlice.reducer;
