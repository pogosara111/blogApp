import React from "react";
import {closePopUpAC} from "../../bll/reducers/commonReducer";
import {useDispatch, useSelector} from "react-redux";
import {deletePostTC} from "../../bll/reducers/postsReducer";
import {RootStateType} from "../../bll/store";

export const PopUpsClose = () => {

    const id = useSelector<RootStateType, number>(state => state.post.id)

    const dispatch = useDispatch();

    const confirmHandler = () =>{
        dispatch(closePopUpAC(false))
        dispatch(deletePostTC(id))
    }
    const unConfirmHandler = () =>{
        dispatch(closePopUpAC(false))
    }

    return(
        <div>
            <div className={"popUp"}>
                <div className={"popUpContainer"}>
                    <button onClick={confirmHandler}>Yes</button>
                    <button onClick={unConfirmHandler}>No</button>
                </div>

            </div>
        </div>
    )
}
