import { useState } from 'react'
import {useRoutes, Link} from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'
import ReadPost from './pages/ReadPost'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import About from './pages/About'
import Contact from './pages/Contact'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import './App.css'

function App() {

  let elements = useRoutes ([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/posts",
      element: <Posts />
    },
    {
      path: "/posts/:id",
      element: <ReadPost />
    },
    {
      path: "/posts/new",
      element: <CreatePost />
    },
    {
      path: "/posts/edit/:id",
      element: <EditPost />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <Contact />
    }
  ])

  return (
    <>
      <div>
        <div className='nav-bar'>
          <NavBar />
        </div>
        <div className='header'>
          <h1>Hangar Talk</h1>
        </div>

        <div className='page-content'>
          {elements}
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
