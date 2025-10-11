
import { motion } from "framer-motion";
import { getVariantStyles } from "../ui/animatedButton";

// FilterBar Component
const FilterBar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }: any) => {
    const tabs = [
        { id: 'blog', label: 'Blog' },
        { id: 'newspaper', label: 'Newspaper' },
        { id: 'newspaper2', label: 'Newspaper' }
    ];

    const styles = getVariantStyles("default")

    return (
        <div className="md:mb-20 mb-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Tabs Section */}
                <div className="flex items-center gap-x-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-row items-center gap-x-2.5 px-6 py-[14px] rounded-full text-base leading-[100%] font-medium transition-all duration-200 ${activeTab === tab.id
                                ? 'bg-black text-white'
                                : 'bg-[#EDEBEF] text-black hover:bg-[#EDEBEF]'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (

                                < motion.div
                                    className={`md:w-2 md:h-2 w-1.5 h-1.5 ${styles.dot} rounded-full`}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [1, 0.6, 1],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Search Section */}
                <div className="relative flex-1 max-w-sm">
                    {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}

                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.80201 1.91687e-08C7.4466 0.000115492 6.11088 0.324364 4.90627 0.945694C3.70166 1.56702 2.6631 2.46742 1.87725 3.57175C1.09139 4.67609 0.581021 5.95235 0.38872 7.29404C0.196418 8.63574 0.327761 10.004 0.77179 11.2846C1.21582 12.5652 1.95966 13.7211 2.94125 14.6557C3.92284 15.5904 5.11372 16.2768 6.41453 16.6576C7.71533 17.0384 9.08835 17.1026 10.419 16.8449C11.7497 16.5872 12.9995 16.015 14.064 15.176L17.716 18.828C17.9046 19.0102 18.1572 19.111 18.4194 19.1087C18.6816 19.1064 18.9324 19.0012 19.1178 18.8158C19.3032 18.6304 19.4084 18.3796 19.4107 18.1174C19.413 17.8552 19.3122 17.6026 19.13 17.414L15.478 13.762C16.466 12.5086 17.0812 11.0024 17.2531 9.41573C17.425 7.82905 17.1468 6.22602 16.4502 4.79009C15.7537 3.35417 14.6669 2.14336 13.3143 1.29623C11.9617 0.449106 10.398 -0.000107143 8.80201 1.91687e-08ZM2.30201 8.5C2.30201 6.77609 2.98683 5.12279 4.20582 3.90381C5.4248 2.68482 7.0781 2 8.80201 2C10.5259 2 12.1792 2.68482 13.3982 3.90381C14.6172 5.12279 15.302 6.77609 15.302 8.5C15.302 10.2239 14.6172 11.8772 13.3982 13.0962C12.1792 14.3152 10.5259 15 8.80201 15C7.0781 15 5.4248 14.3152 4.20582 13.0962C2.98683 11.8772 2.30201 10.2239 2.30201 8.5Z" fill="#484848" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-[#EDEBEF] text-secondary text-base rounded-full  focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};


export default FilterBar