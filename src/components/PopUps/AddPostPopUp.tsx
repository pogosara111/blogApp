import React, {ChangeEvent, useState} from 'react';
import {openPopUpAC} from "../../bll/reducers/commonReducer";
import {useDispatch} from "react-redux";
import {addPostTC} from "../../bll/reducers/postsReducer";

const AddPostPopUp = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const dispatch = useDispatch();

    const closePopUp = () =>{
        dispatch(openPopUpAC(false))
    }
    const addPost = () => {
        dispatch(addPostTC({userId: 1, title: title, body: body}))
        dispatch(openPopUpAC(false))
    }

    const addTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addBody = (e: ChangeEvent<HTMLInputElement>) => {
        setBody(e.currentTarget.value)
    }

    return (
        <div className={"popUp"}>
            <div className={"popUpContainer"}>
                Title: <input onChange={addTitle} value={title}/>
                Body: <input onChange={addBody} value={body}/>
                Add: <button onClick={addPost}>add</button>
                Close: <button onClick={closePopUp}>close</button>
            </div>

        </div>
    );
};

export default AddPostPopUp;
