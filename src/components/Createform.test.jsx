import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
    // Render the CreateForm component
    const Button = screen.getByText('create new blog')
    const user = userEvent.setup()
    await user.click(Button)

    // Fill out the form inputs
    fireEvent.change(getByLabelText('title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('author:'), { target: { value: 'Test Author' } });
    fireEvent.change(getByLabelText('url:'), { target: { value: 'http://example.com' } });

    // Submit the form
    fireEvent.submit(getByText('create'))

    // Check if createBlogMock was called with the correct arguments
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://example.com'
    });

    // Ensure form inputs are cleared after submission
    expect(getByLabelText('title:').value).toBe('')
    expect(getByLabelText('author:').value).toBe('')
    expect(getByLabelText('url:').value).toBe('')
  });
});
