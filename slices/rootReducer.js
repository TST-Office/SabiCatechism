import { combineReducers } from "redux";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";

const rootReducer = combineReducers({
    user: userReducer,
    videos: videoReducer
});

export default rootReducer;