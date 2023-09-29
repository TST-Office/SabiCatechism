import { combineReducers } from "redux";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import themeSlice from "./themeSlice";

const rootReducer = combineReducers({
    user: userSlice,
    videos: videoSlice,
    theme: themeSlice
});

export default rootReducer;