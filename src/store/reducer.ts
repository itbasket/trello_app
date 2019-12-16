export interface AppState {
    count: number;
}

const INITIAL_STATE = {
    count: 0
}

export const mainReducer = (state: AppState = INITIAL_STATE, {type}: any) => {
    switch(type) {
        case 'INCREASE_COUNT':
            return { ...state, count: state.count + 1 };
    }
    return state;
}