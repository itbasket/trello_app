import { Middleware, MiddlewareAPI } from "redux";
import { ACTION_TYPES } from "./types";

const asyncTimeout = async (fn: any, ms: number) => {
    setTimeout(() => {
        Promise.resolve(fn());
    }, ms)
}

export const asyncIncrease: Middleware = (middlewareApi: MiddlewareAPI) => (next: any) => {
    return async (action: any) => {
        if (action.type === ACTION_TYPES.INCREASE_COUNT) {
            await asyncTimeout(() => {
                console.log('fds');
            },2000)
        } else {
            next(action);
        }
    }
}