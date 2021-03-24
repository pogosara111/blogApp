import {Dispatch} from "redux";
import {postAPI} from "../../dal/postAPI";
import {isFetchingAC, setTotalUserCountAC} from "./commonReducer";

export type PostsReducer = {
    userId: number
    id?: number,
    title: string,
    body: string
    photo?: string
}

export type PostsReducerType = {
    posts: Array<PostsReducer>
    post: PostsReducer,
    id: number
}

const InitialState: PostsReducerType = {
    posts: [],
    post: {} as PostsReducer,
    id: 0
}

export const postsReducer = (state = InitialState, action: ActionType) => {

    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.posts
            }
        case "SET_POST":
        case "DELETED_ID":
            return {
                ...state,
                ...action.payload
            }
        case "ON_CHANGE_POST_BODY":
            return {
                ...state,
                post: {...state.post, body: action.body}
            }
        case "DELETE_POST_BODY":
            return {
                ...state,
                posts: state.posts.filter(i => i.id !== action.id)
            }
        case "ADD_POST_BODY":
            return {
                ...state,
                posts: [...state.posts, action.post]
            }

        default:
            return state;
    }
}

export const getPostsTC = () => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    try {
        const res = await postAPI.getPosts()
        dispatch(setTotalUserCountAC(res.data.length))
        dispatch(setPostsAC(res.data))
    } catch (e) {
        alert(e.message)
    }
    dispatch(isFetchingAC(false))
}

export const getPostTC = (id: number) => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    try {
        const res = await postAPI.getPost(id)
        dispatch(setPostAC(res.data))
    } catch (e) {
        alert(e.message)
    }
    dispatch(isFetchingAC(false))
}

export const deletePostTC = (id: number) => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    try {
        await postAPI.deletePost(id)
        dispatch(deletePostAC(id))
    } catch (e) {
        alert(e.message)
    }

    dispatch(isFetchingAC(false))
}

export const addPostTC = (post: PostsReducer) => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    try {
        const res = await postAPI.addPost(post)
        dispatch(addPostAC(res.data))
    } catch (e) {
        alert(e.message)
    }

    dispatch(isFetchingAC(false))
}

export const setPostsAC = (posts: Array<PostsReducer>) => ({
    type: "SET_POSTS", posts
} as const)

export const setPostAC = (post: PostsReducer) => ({
    type: "SET_POST", payload: {post}
} as const)

export const onChangePostBodyAC = (body: string) => ({
    type: "ON_CHANGE_POST_BODY", body
} as const)

export const deletePostAC = (id: number) => ({
    type: "DELETE_POST_BODY", id
} as const)

export const addPostAC = (post: PostsReducer) => ({
    type: "ADD_POST_BODY", post
} as const)

export const setDeletedIdAC = (id: number) => ({
    type: "DELETED_ID", payload: {id}
} as const)

type setPostsTypeAC = ReturnType<typeof setPostsAC>
type setPostTypeAC = ReturnType<typeof setPostAC>
type onChangePostBodyTypeAC = ReturnType<typeof onChangePostBodyAC>
type deletePostTypeAC = ReturnType<typeof deletePostAC>
type addPostTypeAC = ReturnType<typeof addPostAC>
type setDeletedIdTypeAC = ReturnType<typeof setDeletedIdAC>

type ActionType = setPostsTypeAC | setPostTypeAC | onChangePostBodyTypeAC
    | deletePostTypeAC | addPostTypeAC | setDeletedIdTypeAC



