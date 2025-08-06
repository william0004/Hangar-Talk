import { Link } from 'react-router-dom';
import AddCard from '../components/AddCard';

const Home = () => {
  return (
    <div className="home-page">
      <img src="/images/header_logo.jpg" alt="Hangar Talk Logo" className="home-image" />
      <h1>Welcome to Hangar Talk</h1>
      <p>
        Hangar Talk is your community hub for all things Gundam and Gunpla. 
        Share your builds, discuss your favorite series, and connect with fellow fans. 
        Join us and be part of the Gundam universe!
      </p>

      <div className="home-nav-btns">
        <Link to='/posts/new'><button className="home-button">New Post</button></Link>
        <Link to='/posts'><button className="home-button">View Posts</button></Link>
      </div>

      <div className='home-gallery'>
        <h2>Featured Gundam Models</h2>
        <div className="home-gallery-cards">
          <AddCard />
        </div>
      </div>


    </div>
  )
}

export default Home