import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeadlineState {
    deadlineText: string;
    isExist: boolean;
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
            // eslint-disable-next-line no-param-reassign
            state.deadlineText = action.payload;
        },
    },
});

export default deadlineSlice.reducer;
