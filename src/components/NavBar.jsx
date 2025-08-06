import { Route, Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {

  return (
    <div className="nav-bar">
      <div className="nav-logo">
        <img className="nav-logo-image" src="/images/hangar-talk-logo-red.png" alt="Hangar Talk Logo" />
      </div>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <div className="nav-search">
        <input type="text" placeholder="Search..." className="nav-search-input" />
        <button className="nav-search-button">Go!</button>
      </div>

      <div className="nav-auth">
        <button className="nav-login-button">Login</button>
        <button className="nav-signup-button">Sign Up</button>
      </div>

    </div>
  )
}

export default NavBar