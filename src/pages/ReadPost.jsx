import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client';
import Comments from '../components/Comments';

const ReadPost = (props) => {
  const {id} = useParams()
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [post, setPost] = useState({id: null, title: '', author: '', content: '', likeCount: 0});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');


    const featchPost = async () => {
      console.log("Fetching post with ID:", id);
      const {data} = await supabase
        .from('Posts')
        .select()
        .eq('id', id)
        .single();

      setPost(data);
      setLikeCount(data.likeCount || 0);
    }

    const fetchComments = async () => {
      const {data} = await supabase
        .from('Comments')
        .select()
        .eq('post_id', id);

      setComments(data);
      setCommentCount(data.length);
      console.log("Comments fetched: ", data.length);
    }

  const handleLike = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ likeCount: likeCount + 1 })
      .eq('id', id);
    
    setLikeCount(likeCount + 1);
    console.log("Post liked successfully");
  } 

  const addComment = async (event) => {
    event.preventDefault();

    if (!commentContent || !commentAuthor) {
      alert('Please fill in both comment content and author name.');
      return;
    }
    
    await supabase 
      .from('Comments')
      .insert({
        post_id: id,
        content: commentContent,
        author: commentAuthor
      });
    console.log("Comment added successfully: ", commentContent);

    await supabase
      .from('Posts')
      .update({ commentCount: commentCount + 1 })
      .eq('id', id);

    const { data } = await supabase
      .from('Posts')
      .select()
      .eq('id', id)
      .single();

    setPost(data);
    setCommentCount(data.commentCount || 0);
    fetchComments();

    setCommentContent('');
    setCommentAuthor('');
  }

  useEffect(()=> {

    featchPost();
    fetchComments();
  }, [props]);

  return (
    <div className="read-post-page">
      {post ? 
        <div className="post-details">
          <Link to={`/posts/edit/${post.id}`}><img src='/images/edit.png' alt='edit-button' className='edit-post-image'/></Link>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-author'>By: {post.author}</p>
          <br/>
          <p className='post-content'>{post.content}</p>
          <br/>

          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post"
              className="post-image"
              style={{ maxWidth: '100%', marginBottom: '1rem', borderRadius: '8px' }}
            />
          )}

          <button onClick={handleLike} className="like-button">♥️ {likeCount}</button>
          <form onSubmit={addComment} className="comment-form">
            <input type="text" name="comment" placeholder="Add a comment..." value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
            <input type="text" name="author" placeholder="Your name" value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)} />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          <Comments comments={comments} />
        </div>
        : <p>Loading...</p>
      }
    </div>
  );
}

export default ReadPost;