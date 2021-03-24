import {Dispatch} from "redux";
import {photosAPI} from "../../dal/photosAPI";
import {isFetchingAC} from "./commonReducer";

export type PhotosReducer = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export type PhotoReducerType = {
    photos: Array<PhotosReducer>
}

const InitialState: PhotoReducerType = {
    photos: [],
}

export const photosReducer = (state = InitialState, action: ActionType) => {

    switch (action.type) {
        case "SET_PHOTOS":
            return {
                photos: action.photos
            }

        default:
            return state
    }
}

export const getPhotosTC = () => async (dispatch: Dispatch) => {
    dispatch(isFetchingAC(true))
    try {
        const res = await photosAPI.getPhotos()
        dispatch(setPhotosAC(res.data))
    } catch (e) {
        alert(e.message)
    }

    dispatch(isFetchingAC(false))
}
export const setPhotosAC = (photos: Array<PhotosReducer>) => ({
    type: "SET_PHOTOS", photos
} as const)

type setPhotosTypeAC = ReturnType<typeof setPhotosAC>

type ActionType = setPhotosTypeAC
