import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";
import {getPostsTC, PostsReducer, setDeletedIdAC} from "../../bll/reducers/postsReducer";
import {NavLink} from 'react-router-dom';
import {closePopUpAC, setCurrentPageAC} from "../../bll/reducers/commonReducer";
import {PopUpsClose} from "../../components/PopUpsClose/PopUpsClose";
import {getPhotosTC, PhotosReducer} from "../../bll/reducers/photosReducer";
import {Pagination} from '../../components/pagination/Pagination';


const Posts = () => {

    const posts = useSelector<RootStateType, Array<PostsReducer>>(state => state.post.posts)
    const closePopUp = useSelector<RootStateType, boolean>(state => state.common.closePopUp)
    const photos = useSelector<RootStateType, Array<PhotosReducer>>(state => state.photos.photos)
    const currentPage = useSelector<RootStateType, number>(state => state.common.currentPage)
    const pageItemCount = useSelector<RootStateType, number>(state => state.common.pageItemCount)

    const indexOfLastPost = currentPage * pageItemCount;
    const indexOfFirstPost = indexOfLastPost - pageItemCount;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const dispatch = useDispatch();

    const paginate = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    };

    useEffect(() => {
        dispatch(getPostsTC())
        dispatch(getPhotosTC())
    }, [])

    const removeBody = (id: number) => {
        dispatch(setDeletedIdAC(id))
        dispatch(closePopUpAC(true))
    }

    return (
        <div>
            <div className={'posts'}>
                <Pagination
                    pageItemCount={pageItemCount}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}/>
                {currentPosts
                    .map(item => <div key={item.id} className={'post-link'}>
                        {photos.filter(ph => {
                            if(ph.id === item.id){
                              item.photo=ph.thumbnailUrl
                            }
                        }) }
                        <img src={item.photo} alt={''}/>
                        <NavLink to={`/post/${item.id}`}>{item.title}</NavLink>
                        <div className={'edit-button'}>
                            {closePopUp ? <PopUpsClose /> : ""}
                            <button onClick={() =>item.id && removeBody(item.id)}>удалить</button>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default Posts;
