import blogPosts from '@/data/Blogs'
import React from 'react'
import BlogCard from './BlogCard'
import Container from '../Reusable/Container'


const BlogList = () => {
  return (
    <Container>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-[19px] md:gap-y-8'>
        {
          blogPosts.map((blog) => (
            <div key={blog.title}>
              <BlogCard
                title={blog.title}
                date={blog.publishedDate}
                image={blog.banner}
                description={blog.description}
                key={blog.title}
              />
            </div>
          ))
        }
      </div>
    </Container>
  )
}

export default BlogList