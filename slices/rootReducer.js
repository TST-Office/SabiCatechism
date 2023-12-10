import { combineReducers } from "redux";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import themeSlice from "./themeSlice";
import blogSlice from "./blogSlice";
import watchedVideosSlice from "./watchedVideosSlice";

const rootReducer = combineReducers({
    user: userSlice,
    videos: videoSlice,
    theme: themeSlice,
    blog: blogSlice,
    watchedVideos: watchedVideosSlice,
});

export default rootReducer;