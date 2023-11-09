import { useSelector } from "react-redux";

const videosSelector = (state) => state.videos;

export const useVideosSelector = () => {

    return useSelector(videosSelector);
    
}