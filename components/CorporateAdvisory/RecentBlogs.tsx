import { RecentBlogImg1, RecentBlogImg2 } from "@/assets/CorporateAdvisory";
import Image, { StaticImageData } from "next/image";
import AnimatedButton from "../ui/animatedButton";
import SlideUpText from "../ui/SlideUpText";
import BlogCard from "../Insight/BlogCard";
import blogPosts from "@/data/Blogs";
import Container from "../Reusable/Container";
import { useRouter } from "next/navigation";


interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: StaticImageData;
}

const RecentBlogs = () => {

  const router = useRouter();
  return (
    <Container disableYSpacing disablePaddingBottomMobile className=" pt-12">
      <div>
        {/* Header */}
        <div className="text-center md:mb-12 mb-7">
          <SlideUpText animationMode="always">
            <h1 className="lg:text-[44px] text-left md:text-center sfPro md:text-5xl text-[26px] leading-8 lg:leading-[3.5rem] font-normal">
              Our Recent <span className="text-primary">Blogs</span>
            </h1>
          </SlideUpText>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[19px]  h-auto">
          {/* Blog Posts */}
          {blogPosts.slice(0, 2).map((post, i) => (
            <BlogCard
              key={i}
              date={post.publishedDate}
              description={post.description}
              image={post.banner}
              title={post.title}
            />
          ))}

          {/* Explore More Card */}
          <div className="bg-primary lg:block hidden  rounded-2xl p-8 text-white relative h-full md:h-[292px] lg:h-[392px]">
            {/* Background decoration */}
            <div className="absolute top-4 right-4 opacity-20">
              <div className="w-20 h-20 rounded-full border border-white/20"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20">
              <div className="w-32 h-32 rounded-full border border-white/20"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-between items-start h-full">
              <div>
                {/* Small label */}
                <div className="text-purple-200 inline-block rounded-[6px] text-sm mb-2 font-medium px-[10px] py-[6px] bg-[#7F5EFB]">
                  Blogs
                </div>

                {/* Main heading */}
                <h3 className="text-[32px] md:text-3xl font-medium leading-[36px]">
                  Want to Explore More?
                </h3>
              </div>

              <div className="flex flex-col justify-between items-start">
                {/* Description */}
                <p className="text-[#B8B5FF] text-sm 2xl:text-base leading-[24px] mb-3">
                  We are pleased to announce that Nine Rivers Capital acted as
                  the sole financial advisor to Isthara Parks in its Series A
                  equity capital raise from JM Financial Private Equity
                </p>

                <AnimatedButton
                  onClick={() => router.push("/insights")}
                  label="Explore More"
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatedButton
          className="md:hidden mt-6 md:mb-36"
          onClick={() => router.push("/insights")}
          label="Explore More"
        />
      </div>
    </Container>
  );
};

export default RecentBlogs;