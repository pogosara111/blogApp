import React, {ChangeEvent, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Coments from "./coments/Comments";
import {useDispatch, useSelector} from "react-redux";
import {getPostTC, onChangePostBodyAC, PostsReducer} from "../../../bll/reducers/postsReducer";
import {RootStateType} from "../../../bll/store";
import {getPhotosTC, PhotosReducer} from "../../../bll/reducers/photosReducer";

const Post = () => {

    const post = useSelector<RootStateType, PostsReducer>(state => state.post.post)
    const photos = useSelector<RootStateType, Array<PhotosReducer>>(state => state.photos.photos)
    const [editModeBody, setEditModeBody] = useState<boolean>(false)

    const {id}: any = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostTC(id))
        dispatch(getPhotosTC())
    }, [id])

    const onChangePostBody = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangePostBodyAC(e.currentTarget.value))
    }
    const onChangeBody = () => {
        setEditModeBody(!editModeBody)
    }

    const photoItem = photos.find(i => i.id === +id)

    return (
        <div className={'post'}>
            <div className={'post-description'}>
                <h1>{post.title}</h1>
                <img src={photoItem?.url} alt={''}/>

                <div className={'post-text'}>
                    {editModeBody
                        ? <input onChange={onChangePostBody} value={post.body}/>

                        : <div>{post.body}</div>
                    }
                </div>
                <div className={'edit-button'}>
                    <button onClick={onChangeBody}>редактировать</button>
                </div>

            </div>

            <Coments id={id}/>
        </div>
    );
};

export default Post;
