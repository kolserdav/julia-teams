import { createSlice, configureStore } from '@reduxjs/toolkit';

interface State {
  id: string | number;
  admin: boolean;
}

interface Action {
  payload: State;
}

const slice = createSlice({
  name: 'admin',
  initialState: {
    id: 0,
    admin: false,
  } as State,
  reducers: {
    changeAdmin: (state: State, action: Action) => {
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload.id;
      // eslint-disable-next-line no-param-reassign
      state.admin = action.payload.admin;
    },
  },
});

export const { changeAdmin } = slice.actions;

const storeAdmin = configureStore({
  reducer: slice.reducer,
});

export default storeAdmin;