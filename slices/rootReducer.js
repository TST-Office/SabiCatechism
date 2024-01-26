import { combineReducers } from "redux";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import themeSlice from "./themeSlice";
import blogSlice from "./blogSlice";
import watchedVideosSlice from "./watchedVideosSlice";
import investmentPackageSlice from "./investmentPackageSlice";

const rootReducer = combineReducers({
    user: userSlice,
    videos: videoSlice,
    theme: themeSlice,
    blog: blogSlice,
    watchedVideos: watchedVideosSlice,
    investmentPackage: investmentPackageSlice
});

export default rootReducer;