import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "user",
	initialState: { user: {}, isLoggedIn: false },
	reducers: {
		login: (state, action) => ({
			user: action.payload,
			isLoggedIn: true,
		}),
		logout: (state, action) => ({
			user: {},
			isLoggedIn: false,
		}),
	},
});

export const { login, logout } = slice.actions;
export default slice.reducer;
