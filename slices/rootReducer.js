import { combineReducers } from "redux";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

const rootReducer = combineReducers({
    user: userSlice,
    videos: videoSlice
});

export default rootReducer;