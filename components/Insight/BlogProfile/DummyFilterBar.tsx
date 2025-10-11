'use client'

import Container from "@/components/Reusable/Container";
import { useRouter } from "next/navigation";

const DummyFilterBar = () => {
    const tabs = [
        { id: 'blog', label: 'Blog' },
        { id: 'newspaper', label: 'Newspaper' },
        { id: 'newspaper2', label: 'Newspaper' }
    ];

    const router = useRouter();

    const navigateBack = () => {
        router.back()
    }


    return (
        <Container disableYSpacing className="md:mt-40 mt-28 md:mb-9 mb-12">
            <div className="flex items-center justify-between gap-4 flex-wrap w-full">
                <div
                    onClick={navigateBack}
                    className='flex flex-row justify-end right-0 top-0 items-center gap-2.5 rounded-full border h-10 px-4 py-[14px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95'
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6665 7.33287H4.75984L7.17984 4.4262C7.293 4.29005 7.34744 4.11453 7.33118 3.93825C7.31493 3.76197 7.22932 3.59936 7.09317 3.4862C6.95703 3.37304 6.78151 3.3186 6.60522 3.33485C6.42894 3.35111 6.26633 3.43672 6.15317 3.57287L2.81984 7.57287C2.79695 7.60438 2.77688 7.63784 2.75984 7.67287C2.75984 7.7062 2.75984 7.7262 2.71317 7.75953C2.68295 7.83597 2.66713 7.91734 2.6665 7.99953C2.66713 8.08173 2.68295 8.16309 2.71317 8.23953C2.71317 8.27287 2.71317 8.29287 2.75984 8.3262C2.77688 8.36122 2.79695 8.39468 2.81984 8.4262L6.15317 12.4262C6.21585 12.5015 6.29435 12.562 6.38307 12.6035C6.47179 12.6449 6.56856 12.6664 6.6665 12.6662C6.82227 12.6665 6.97323 12.6123 7.09317 12.5129C7.16068 12.4569 7.21648 12.3882 7.25738 12.3106C7.29828 12.233 7.32348 12.1482 7.33153 12.0608C7.33958 11.9735 7.33032 11.8855 7.30429 11.8017C7.27826 11.718 7.23597 11.6402 7.17984 11.5729L4.75984 8.6662H12.6665C12.8433 8.6662 13.0129 8.59596 13.1379 8.47094C13.2629 8.34591 13.3332 8.17634 13.3332 7.99953C13.3332 7.82272 13.2629 7.65315 13.1379 7.52813C13.0129 7.4031 12.8433 7.33287 12.6665 7.33287Z" fill="black" />
                    </svg>
                    <p>Go Back</p>
                </div>
            </div>
        </Container>
    );
};


export default DummyFilterBar;