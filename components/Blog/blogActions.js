import { useDispatch } from 'react-redux';
import { setBlogPosts } from '../../slices/blogSlice';
import { API_URL } from '../../constants';

const dispatch = useDispatch();

export const fetchAndPersistLatestBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog`);
    const latestBlogs = response.data;
    dispatch(setBlogPosts(latestBlogs));
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
  }
};
