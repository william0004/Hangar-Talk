const PostCard = ({ post }) => {

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffMs = now - postDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);  
    if (diffDay > 0) {
      return `Posted on ${postDate.toLocaleDateString()} at ${postDate.toLocaleTimeString()}`;
    } else if (diffHour > 0) {
      return `Posted ${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `Posted ${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    } else {
    return `Posted just now`;
    } 
  };


  return (
    <div className="post-card">
      <p className="post-date">{formatTimeAgo(post.created_at)}</p>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-comments">{post.commentCount} comments</p>
      <p className="post-likes">{post.likeCount}</p>
    </div>
  );
};

export default PostCard;