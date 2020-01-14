import { ACTION_TYPES } from "./types";

export interface AppState {
    count: number;
}

const INITIAL_STATE = {
    count: 0
}

export const mainReducer = (state: AppState = INITIAL_STATE, {type}: any) => {
    switch(type) {
        case ACTION_TYPES.INCREASE_COUNT:
            return { ...state, count: state.count + 1 };
        case ACTION_TYPES.INCREASE_COUNT:
            return { ...state, count: state.count - 1 };
    }
    return state;
}