import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/Createform'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null } )
    }, 3000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      })
      .catch(() => {
        notifyWith('wrong credentials', 'error')
      })
  }
  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }
  const handleLikes = (blogObject) => {
    const updatedBlog = {
      likes: blogObject.likes + 1
    }
    blogService
      .update(blogObject.id, updatedBlog)
      .catch(error => {
        console.error('Error updating blog:', error)
      })
    window.location.reload()
  }
  const handleRemove =(blogObject) => {
    const confirmed = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)

    if (confirmed) {
      blogService.remove(blogObject.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
          notifyWith(`${blogObject.title} by ${blogObject.author} has been removed`)
        })
        .catch(error => {
          console.error('Error removing blog:', error)
          notifyWith('Failed to remove blog', 'error')
        })
    }
  }
  const logOut = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    window.location.reload()
  }
  const LogoutButton = () => (
    <button type="submit" onClick={logOut}>logout</button>
  )
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={info} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        {user && <div>
          <p>{user.name} logged in</p>
        </div>}
      </div>
    )
  }
 
  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      {user && <div>
        <p>{user.name} logged in</p>
        <div><LogoutButton /></div>
      </div>}
      <Togglable buttonLabel="create new blog">
        <CreateForm createBlog={addBlog} />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemove={handleRemove}/>
      )}

    </div>
  )
}
export default App