import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'
// 5.13: Blog List Tests, step 1
test('renders title and author, but not URL or likes by default', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author:'author',
        url: 'www.test.com',
        likes: 10,
        user: {
        name: 'John doe'
        }
    }

    render(<Blog blog={blog}/>)

    const titleElement = screen.getByText(/Component testing is done with react-testing-library/i)
    expect(titleElement).toBeDefined()
    const authorElement = screen.getByText(/author/i)
    expect(authorElement).toBeDefined()
    const urlElement = screen.queryByText(/www.test.com/i) 
    expect(urlElement).toBeNull()
})
 
test('renders title by default', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author:'author',
        url: 'www.test.com',
        likes: 10,
        user: {
        name: 'John doe'
        }
    }

    render(<Blog key={blog.id} blog={blog} />)

    const titleElement = screen.getByText(/Component testing is done with react-testing-library/i)
    expect(titleElement).toBeDefined()
    const authorElement = screen.getByText(/author/i)
    expect(authorElement).toBeDefined()
})
// 5.15: Blog List Tests, step 3
test('clicking likes twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author:'author',
        url: 'www.test.com',
        likes: 10,
        user: {
        name: 'John doe'
        }
    }
    
    const mockHandler = vi.fn()

    render(
    <Blog blog={blog} handleLikes={mockHandler}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)


    expect(mockHandler.mock.calls).toHaveLength(2)
})
// test('blog details are shown when the "view" button is clicked', () => {
//     const blog = {
//         title: 'Component testing is done with react-testing-library',
//         author: 'Author Name',
//         url: 'www.test.com',
//         likes: 10,
//         user: {
//           name: 'John doe'
//         }
//       }
//     const mockHandleLikes = vi.fn()
//     const mockHandleRemove = vi.fn()
//     const container = render(<Blog key={blog.id} blog={blog} handleLikes={mockHandleLikes} handleRemove={mockHandleRemove}/>)
//     const Button =container.querySelector('.viewButton')
//     fireEvent.click(Button)
//     const content =container.querySelector('.blogContent') 
//     expect(content).not.toHaveStyle('display: none')
//     expect(content).toHaveTextContent('www.test.com')
// })