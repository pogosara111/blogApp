import {instance} from "./instance";

export const photosAPI = {
    getPhotos() {
        return instance.get('/photos')
    }
}
