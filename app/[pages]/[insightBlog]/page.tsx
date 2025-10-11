import Hero from '@/components/Common/Hero';
import BlogProfile from '@/components/Insight/BlogProfile/BlogProfile';
import DummyFilterBar from '@/components/Insight/BlogProfile/DummyFilterBar';
import ReadNext from '@/components/Insight/BlogProfile/ReadNext';
import blogPosts from '@/data/Blogs';
import React from 'react';

interface DynamicPageProps {
    params: {
        insightBlog: string;
    };
}

const Page: React.FC<DynamicPageProps> = ({ params }) => {
    const { insightBlog } = params;

    const decodedSlug = decodeURIComponent(insightBlog)
        .toLowerCase()
        .replace(/\s+/g, '-')            
        .replace(/[^\w-]/g, '');       

    const findBlog = blogPosts.find(blog => {
        const blogSlug = blog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return blogSlug === decodedSlug;
    });


    if (!findBlog) {
        return <div className="text-center mt-20 text-xl font-semibold">Blog not found</div>;
    }

    return (
        <div>
            <DummyFilterBar/>
            <BlogProfile blog={findBlog} />
            <ReadNext/>
        </div>
    );
};

export default Page;
