const Comments = ({ comments }) => {
  return (
    <div className="comments-section">
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p className="comment-content">{comment.content}</p>
              <p className="comment-author">By: {comment.author}</p>
              <p className="comment-date">Posted on: {new Date(comment.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
} 

export default Comments;