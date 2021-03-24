import {instance} from "./instance";
import {PostsReducer} from "../bll/reducers/postsReducer";

export const postAPI = {
    getPosts(){
        return instance.get('/posts')
    },
    getPost(id: number){
        return instance.get(`/posts/${id}`)
    },
    deletePost(id: number){
        return instance.delete(`/posts/${id}`)
    },
    addPost(newPost: PostsReducer){
        return instance.post('/posts', newPost)
    }
}
