import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeadlineState {
    deadlineText: string;
    isExist: boolean
}

const initialState: DeadlineState = {
    deadlineText: 'test',
    isExist: false,
};

export const deadlineSlice = createSlice({
    name: 'deadlineText',
    initialState,
    reducers: {
        date(state, action: PayloadAction<string>) {
            const newState = state;
            newState.deadlineText = action.payload;
        },
    },
});

export default deadlineSlice.reducer;
