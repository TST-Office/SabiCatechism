import { useSelector } from "react-redux";

const userSelector = (state) => state.user;

export const useUserSelector = () => {
    return useSelector(userSelector);
}