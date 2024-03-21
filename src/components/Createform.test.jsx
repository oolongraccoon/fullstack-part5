import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CreateForm from './Createform'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import Togglable from './Togglable'
describe('CreateForm component', () => {
  test('calls event handler with correct details when a new blog is created', async () => {

    const createBlogMock = vi.fn()
    const { container } = render(
        <Togglable buttonLabel="create new blog">
          <CreateForm createBlog={createBlogMock} />
        </Togglable>
      )

    const Button = screen.getByText('create new blog')
    await userEvent.click(Button)
    await screen.findByTestId('create')

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    fireEvent.change(titleInput, {
      target: { value: "Test Title" },
    });
    fireEvent.change(authorInput, {
      target: { value: "Test Author" },
    });
    fireEvent.change(urlInput, {
      target: { value: "http://test.com" },
    });
 
    const createButton = screen.getByText('create')
    await userEvent.click(createButton)

    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://test.com'
    });
 
 
    expect(createBlogMock).toHaveBeenCalledTimes(1)
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://test.com',
    })
})
})
// 5.16: Blog List Tests, step 4