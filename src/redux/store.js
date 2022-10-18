import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users.slice';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
