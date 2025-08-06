
function SetOrder ({order, setOrder} ) {
  return (
    <div className="posts-order">
      <p className="order-label">Order by:</p>
      <button className={order==='newest' ? "order-button active" : "order-button"} onClick={() => setOrder('newest')}>Newest</button>
      <button className={order==='oldest' ? "order-button active" : "order-button"} onClick={() => setOrder('oldest')}>Oldest</button>
      <button className={order==='mostLiked' ? "order-button active" : "order-button"} onClick={() => setOrder('mostLiked')}>Most Liked</button>
    </div>
  );
}

export default SetOrder;
