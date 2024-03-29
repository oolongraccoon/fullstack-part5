const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Title 2',
    author: 'Author 2',
    url: 'https://example.com/article2',
    likes: 10,
    __v: 0
  }
]


const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) =>{
    const likes = blogs.reduce(function(sum, blog){
         
        return sum + blog.likes
    },0)
    return likes  
}
const favoriteBlog = (blogs) =>{
    let maxLikes = -1
    for (const blog of blogs) {
        if (blog.likes > maxLikes) {
          maxLikes = blog.likes
          favorite = blog
        }
    }

    return blogs.length === 0
        ? null
        : favorite        
}

 
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    initialBlogs, 
    blogsInDb,
    usersInDb
  }