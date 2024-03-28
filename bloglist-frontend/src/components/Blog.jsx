
import { useState  } from 'react'

const Blog = ({ blog,handleLikes,handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <li className='blog'>
      <div style={blogStyle}>
        <div data-testid='blogView'>
          {blog.title} {blog.author}
        </div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility} id='viewButton'>view</button>
        </div>
        <div style={showWhenVisible} data-testid='blogContent'>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleLikes(blog)}>like</button>
          <p>{blog.user.name}</p>
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </li>
  )
}
export default Blog