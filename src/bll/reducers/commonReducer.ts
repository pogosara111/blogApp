export type CommonReducer = {
    userTotalCount: number,
    currentPage: number,
    pageItemCount: number
    isShowPopUp: boolean
    closePopUp: boolean
    isFetching: boolean
}

const InitialState: CommonReducer = {
    userTotalCount: 0,
    currentPage: 1,
    pageItemCount: 10,
    isShowPopUp: false,
    closePopUp: false,
    isFetching: false
}

export const commonReducer = (state = InitialState, action: ActionType) => {
    switch (action.type) {
        case "SET_CURRENT_PAGE":
        case "OPEN_POPUP":
        case "CLOSE_POPUP":
        case "IS_FETCHING":
        case "SET_TOTAL_USER_COUNT":
        case "SET_PAGE_ITEM_COUNT":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const  setPageItemCountAC = (pageItemCount: number) => ({
    type: "SET_PAGE_ITEM_COUNT", payload: {pageItemCount}
}as const)

export const setTotalUserCountAC = (userTotalCount: number) => ({
    type: "SET_TOTAL_USER_COUNT", payload: {userTotalCount}
}as const)

export const setCurrentPageAC = (currentPage: number) => ({
    type: "SET_CURRENT_PAGE", payload: {currentPage}
} as const)

export const openPopUpAC = (isShowPopUp: boolean) => ({
    type: "OPEN_POPUP", payload: {isShowPopUp}
} as const)

export const closePopUpAC = (closePopUp: boolean) => ({
    type: "CLOSE_POPUP", payload: {closePopUp}
} as const)

export const isFetchingAC = (isFetching: boolean) => ({
    type: "IS_FETCHING", payload: {isFetching}
} as const)

type setCurrentPageTypeAC = ReturnType<typeof setCurrentPageAC>
type openPopUpTypeAC = ReturnType<typeof openPopUpAC>
type closePopUpTypeAC = ReturnType<typeof closePopUpAC>
type isFetchingTypeAC = ReturnType<typeof isFetchingAC>
type setTotalUserCountTypeAC = ReturnType<typeof setTotalUserCountAC>
type setPageItemCountTypeAC = ReturnType<typeof setPageItemCountAC>

type ActionType = setCurrentPageTypeAC | openPopUpTypeAC | closePopUpTypeAC
    | isFetchingTypeAC | setTotalUserCountTypeAC | setPageItemCountTypeAC
