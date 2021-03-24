import React, {ChangeEvent, useEffect} from 'react';
import Comment from "./coment/Comment";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {
    CommentsReducer,
    getCommentsTC,
    newCommentsAC,
    removeCommentsAC,
    setCommentsAC
} from "../../../../bll/reducers/commentsReducer";
import {RootStateType} from "../../../../bll/store";

type CommentsPropsType = {
    id: number
}

const Comments = (props: CommentsPropsType) => {

    const comments = useSelector<RootStateType, Array<CommentsReducer>>(state => state.comment.comments)
    const newComments = useSelector<RootStateType, string>(state => state.comment.newComment)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommentsTC(props.id))
    }, [])

    const onChangeNewComments = (e: ChangeEvent<HTMLInputElement>) =>{
        dispatch(newCommentsAC(e.currentTarget.value))
    }

    const newComment = {
        postId: 1,
        id: 12,
        name: "John",
        email: "johny@gmail.by",
        body: newComments
    }

    const addComments = () =>{
        dispatch(setCommentsAC([...comments, newComment]))
        dispatch(newCommentsAC(""))
    }

    const removeComments = (id: number) =>{
        dispatch(removeCommentsAC(id))
    }

    return (
        <div className={'coments'}>
            {comments.length < 1
                ? <div>"Оставить коментарий"</div>
                : comments.map(item => <Comment id={item.id} name={item.name} email={item.email} body={item.body}
                removeComments={removeComments}/>)
            }

            <div>
                <input onChange={onChangeNewComments} value={newComments}/>
                <span><button onClick={addComments}>add</button></span>
            </div>
        </div>
    );
};

export default Comments;
