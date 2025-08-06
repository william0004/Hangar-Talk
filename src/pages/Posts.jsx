import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client';
import SetOrder from '../components/SetOrder';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('Posts')
        .select();

      if (!data) {
        setPosts([]);
        return;
      }

      let filteredPosts = data;
      if (searchQuery) {
        filteredPosts = data.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      let sortedPosts = [...filteredPosts];
      if (order === 'newest') {
        sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (order === 'mostLiked') {
        sortedPosts.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
      } else if (order === 'oldest') {
        sortedPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }

      setPosts(sortedPosts);
    };

    fetchPosts();
  }, [order, searchQuery]);

  return (
    <div className="posts-page">

      <div className='filters'>
      <SetOrder order={order} setOrder={setOrder} />
            <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />
      </div>

      {posts.length > 0 ? (
        <ul className='posts-list'>
          {posts.map((post) => (
            <Link to ={`/posts/${post.id}`} key={post.id}>
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}

      <Link to='/posts/new'><button className="post-new-button">New Post</button></Link>
    </div>
  );
}

export default Posts;