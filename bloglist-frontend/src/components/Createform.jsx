import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <form onSubmit={handleSubmit} data-testid= 'create'>
      <h2>Create new</h2>
      <div>title: <input type="text" value={title} onChange={handleTitleChange} id='title-input' data-testid='title-input'/></div>
      <div>author: <input type="text" value={author} onChange={handleAuthorChange} id='author-input' data-testid='author-input'/></div>
      <div>url: <input type="text" value={url} onChange={handleUrlChange} id='url-input' data-testid='url-input' /></div>
      <div><button type="submit" id='create-button' data-testid= 'create'>create</button></div>
    </form>
  )
}

export default CreateForm