import blogPosts from '@/data/Blogs';
import React from 'react';
import BlogCard from '../BlogCard';
import Container from '@/components/Reusable/Container';

const ReadNext = () => {
    return (
        <Container disableYSpacing className="mt-32 mb-28">
            <h1 className="md:text-[44px] text-[26px] leading-[34px] md:leading-[100%] text-center">What to read next</h1>

            {/* all */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 md:mt-14 md:hidden lg:grid">
                {blogPosts.slice(0, 3).map((blog) => (
                    <BlogCard
                        key={blog.title}
                        date={blog.publishedDate}
                        description={blog.description}
                        image={blog.banner}
                        title={blog.title}
                    />
                ))}
            </div>

            {/* tablet */}
            <div className="md:grid lg:hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 hidden ">
                {blogPosts.slice(0, 4).map((blog) => (
                    <BlogCard
                        key={blog.title}
                        date={blog.publishedDate}
                        description={blog.description}
                        image={blog.banner}
                        title={blog.title}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReadNext;
