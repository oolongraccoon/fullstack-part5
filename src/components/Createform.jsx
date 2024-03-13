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

    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>title: <input type="text" value={title} onChange={handleTitleChange}  /></div>
      <div>author: <input type="text" value={author} onChange={handleAuthorChange} /></div>
      <div>url: <input type="text" value={url} onChange={handleUrlChange}  /></div>
      <div><button type="submit" id='create-button'>create</button></div>
    </form>
  )
}

export default CreateForm