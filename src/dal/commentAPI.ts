import {instance} from "./instance";

export const commentAPI = {
    getComments(postId: number){
        return instance.get(`/comments?postId=${postId}`)
    }

}
