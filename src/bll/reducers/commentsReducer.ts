import {Dispatch} from "redux";
import {commentAPI} from "../../dal/commentAPI";
import {isFetchingAC} from "./commonReducer";

export type CommentsReducer = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export type CommentsReducerType = {
    comments: Array<CommentsReducer>
    newComment: string
}

const InitialState: CommentsReducerType = {
    comments: [],
    newComment: ''
}

export const commentsReducer = (state = InitialState, action: ActionType) => {
    switch (action.type) {

        case "SET_COMMENTS":
            return {
                ...state,
                comments: action.comments
            }
        case "NEW_COMMENTS":
            return {
                ...state,
                ...action.payload
            }
        case "REMOVE_COMMENTS":
            return {
                ...state,
                comments: state.comments.filter(item => item.id !== action.id)
            }

        default:
            return state;
    }
}

export const getCommentsTC = (postId: number) => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    try {
        const res = await commentAPI.getComments(postId)
        dispatch(setCommentsAC(res.data))
    } catch (e) {
        alert(e.message)
    }

    dispatch(isFetchingAC(false))
}

export const newCommentsAC = (newComments: string) => ({
    type: "NEW_COMMENTS", payload: {newComments}
} as const)

export const removeCommentsAC = (id: number) => ({
    type: "REMOVE_COMMENTS", id
} as const)

export const setCommentsAC = (comments: Array<CommentsReducer>) => ({
    type: "SET_COMMENTS", comments
} as const)

type setCommentsTypeAC = ReturnType<typeof setCommentsAC>
type newCommentsTypeAC = ReturnType<typeof newCommentsAC>
type removeCommentsTypeAC = ReturnType<typeof removeCommentsAC>

type ActionType = setCommentsTypeAC | newCommentsTypeAC | removeCommentsTypeAC
