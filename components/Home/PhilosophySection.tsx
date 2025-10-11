import Image from "next/image";
import AnimatedButton from "../ui/animatedButton";
import Badge from "../ui/badge";
import Container from "../Reusable/Container";
import SlideUpText from "../ui/SlideUpText";

export default function PhilosophySection() {
  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile className="bg-[#F6F9FC] py-12 md:py-0">
      <section className="md:py-20 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-16 items-center">
            {/* Left Content */}
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-2 md:space-y-4 ">
                {/* Tag */}
                <Badge label="Our Philosophy" />

                {/* Heading */}
                <div className="md:space-y-2 md:mt-2 mt-4">
                  <SlideUpText animationMode="always">
                    <h2 className="text-[26px] md:text-5xl   font-[400] leading-8 md:leading-[58px]">
                      Private Equity Thinking.<span className="md:hidden text-primary ">Public</span>
                    </h2>
                  </SlideUpText>
                  <SlideUpText animationMode="always">
                    <h2 className="text-[26px] md:text-5xl md:flex md:gap-3  font-[400] text-primary leading-8 md:leading-[58px]">
                      <span className="md:block hidden ">Public</span>Market Execution.
                    </h2>
                  </SlideUpText>
                </div>

                {/* Description */}
                <SlideUpText animationMode="always" delay={0.4} className="mt-2 md:mt-0">
                  <p className="text-sm md:text-base text-secondary leading-6 md:leading-relaxed max-w-lg font-[400]">
                    Every investment undergoes rigorous PE-style
                    diligence—business model checks, promoter governance,
                    capital allocation discipline—before it enters a Nine Rivers
                    portfolio.
                  </p>
                </SlideUpText>
              </div>

              {/* Desktop Button */}
              <div className="md:block hidden">
                <AnimatedButton label="Learn More" className="mt-6" />
              </div>
            </div>

            {/* Right Icons Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
              {/* Research Depth */}
              <div className="text-center space-y-4 bg-white md:rounded-xl rounded-[7px] py-6 flex flex-col items-center justify-center w-full h-[180px] md:h-[200px] lg:h-[216px] xl:w-[270px] xl:h-[200px] shadow-[16px_6px_93px_0px_rgba(0,0,0,0.15)] hover:shadow-none transition-shadow duration-500">
                <div className="md:w-24 md:h-[100px] w-14 h-14 mx-auto flex items-center justify-center relative ">
                  <Image
                    src="/philosophyRow1Img1.png"
                    alt="philosophyRow1Img1"
                    width={190}
                    height={200}
                    className="md:w-24 md:h-[100px] border "
                  />
                </div>
                <h3 className="font-[400] text-gray-900 text-xs leading-3 md:leading-6 md:text-base">
                  Research Depth
                </h3>
              </div>

              {/* Conviction Portfolios */}
              <div className="text-center space-y-4 bg-white md:rounded-xl rounded-[7px] py-6 flex flex-col items-center justify-center w-full h-[180px] md:h-[200px] lg:h-[216px] xl:w-[270px] xl:h-[200px] shadow-[16px_6px_93px_0px_rgba(0,0,0,0.15)] hover:shadow-none transition-shadow duration-500">
                <div className="md:w-44 md:h-[109px] w-14 h-14 mx-auto flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/philosophyRow1Img2.png"
                    alt="philosophyRow1Img2"
                    width={200}
                    height={200}
                    className="md:w-44 md:h-[109px]"
                  />
                </div>
                <h3 className="font-[400] text-gray-900 text-xs leading-3 md:leading-6 md:text-base">
                  Conviction Portfolios
                </h3>
              </div>

              {/* Risk Management */}
              <div className="text-center space-y-4 bg-white md:rounded-xl rounded-[7px] py-6 flex flex-col items-center justify-center w-full h-[180px] md:h-[200px] lg:h-[216px] xl:w-[270px] xl:h-[200px] shadow-[16px_6px_93px_0px_rgba(0,0,0,0.15)] hover:shadow-none transition-shadow duration-500">
                <div className="md:w-[170px] md:h-[101px] w-14 h-14 mx-auto flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/philosophyRow2Img1.png"
                    alt="philosophyRow2Img1"
                    width={300}
                    height={300}
                    className="md:w-[170px] md:h-[101px]"
                  />
                </div>
                <h3 className="font-[400] text-gray-900 text-xs leading-3 md:leading-6 md:text-base">
                  Risk Management
                </h3>
              </div>

              {/* Long-Term Alignment */}
              <div className="text-center space-y-4 bg-white md:rounded-xl rounded-[7px] py-6 flex flex-col items-center justify-center w-full h-[180px] md:h-[200px] lg:h-[216px] xl:w-[270px] xl:h-[200px] shadow-[16px_6px_93px_0px_rgba(0,0,0,0.15)] hover:shadow-none transition-shadow duration-500">
                <div className="md:w-[133px] md:h-[88px] w-14 h-14 mx-auto flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/philosophyRow2Img2.png"
                    alt="philosophyRow2Img2"
                    width={200}
                    height={200}
                    className="md:w-[133px] md:h-[88px]"
                  />
                </div>
                <h3 className="font-[400] text-gray-900 text-xs leading-3 md:leading-6 md:text-base">
                  Long-Term Alignment
                </h3>
              </div>
            </div>
          </div>

          {/* Desktop Button */}
          <AnimatedButton label="Learn More" className="mt-6 md:hidden block" />
        </div>
      </section>
    </Container>
  );
}
