import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "search",
	initialState: { position: "", location: "" },
	reducers: {
		setLocation: (state, action) => ({
			...state,
			location: action.payload,
		}),

		setPosition: (state, action) => ({
			...state,
			position: action.payload,
		}),
	},
});

export const { setLocation, setPosition } = slice.actions;

export default slice.reducer;
