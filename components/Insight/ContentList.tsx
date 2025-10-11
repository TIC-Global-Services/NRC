import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from './BlogCard';
import blogPosts from '@/data/Blogs';
import NewspaperCard from './NewspaperCard';
import FilterBar from './FilterBar';
import Container from '../Reusable/Container';
import Image from 'next/image';
import { NoBlogPlaceHolder } from '@/assets/Insights';

// Main ContentList Component
const ContentList = () => {
    const [activeTab, setActiveTab] = useState('blog');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter function
    const filterContent = (items: any) => {
        if (!searchQuery.trim()) return items;

        return items.filter((item: any) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Get filtered content based on active tab
    const getFilteredContent = () => {
        switch (activeTab) {
            case 'blog':
                return filterContent(blogPosts);
            case 'newspaper':
            case 'newspaper2':
                return filterContent(blogPosts);
            default:
                return [];
        }
    };

    const filteredContent = getFilteredContent();

    return (
        <Container disableYSpacing className='pt-9 md:pb-48 pb-20'>
            <div className=" py-8">
                {/* Filter Bar */}
                <FilterBar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Content Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeTab}-${searchQuery}`}
                        className={`grid grid-cols-1 ${filteredContent.length <= 0 ? `` : `lg:grid-cols-3`} gap-[19px] gap-y-8 w-full `}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filteredContent.length > 0 ? (
                            filteredContent.map((item: any, index: any) => (
                                <motion.div
                                    key={`${item.title}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    {activeTab === 'blog' ? (
                                        <BlogCard
                                            title={item.title}
                                            date={item.publishedDate}
                                            image={item.banner}
                                            description={item.description}
                                        />
                                    ) : (
                                        <NewspaperCard
                                            title={item.title}
                                            date={item.publishedDate}
                                            image={item.banner}
                                            description={item.description}
                                        />
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className="flex flex-col items-center justify-center w-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Image src={NoBlogPlaceHolder} alt='NoBlogPlaceHolder' className='' width={529} height={600} />
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Container>
    );
};

export default ContentList;