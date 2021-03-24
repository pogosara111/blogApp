import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleWare  from "redux-thunk";
import { commonReducer } from "./reducers/commonReducer";
import {postsReducer} from "./reducers/postsReducer";
import {commentsReducer} from "./reducers/commentsReducer";
import {photosReducer} from "./reducers/photosReducer";

let reducers = combineReducers({

    post: postsReducer,
    common: commonReducer,
    comment: commentsReducer,
    photos: photosReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export type RootStateType = ReturnType<typeof reducers>;

// @ts-ignore
window.store = store;
