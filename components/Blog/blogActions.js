import { useSelector } from "react-redux";
import blogSlice from "../../slices/blogSlice";


export const useBlogsSelector = () => {

    return useSelector((state) => state.blog);
    
}