import { combineReducers } from "redux";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import themeSlice from "./themeSlice";
import blogSlice from "./blogSlice";

const rootReducer = combineReducers({
    user: userSlice,
    videos: videoSlice,
    theme: themeSlice,
    blog: blogSlice
});

export default rootReducer;