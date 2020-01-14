import { ACTION_TYPES } from "./types"

// action creator
export const increaseCount = () => ({
    type: ACTION_TYPES.INCREASE_COUNT,
    payload: 'HELLO_WORLD'
});

export const decreaseCount = () => ({
    type: ACTION_TYPES.DECREASE_COUNT,
    payload: 'HELLO_WORLD'
});
