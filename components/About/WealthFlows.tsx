import { WealthFlow } from "@/assets/About";
import React from "react";
import Image from "next/image";
import AnimatedButton from "../ui/animatedButton";
import Container from "../Reusable/Container";
import { useRouter } from "next/navigation";


const WealthFlows = () => {
      const router = useRouter();
      const handleRedirectTo = () => {
          router.push("/contact")
      }
      
  return (
    <Container disablePaddingTopMobile disablePaddingBottomMobile className="pt-8 md:pt-20 lg:pt-0">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-5 lg:h-[80vh]  2xl:h-[70vh]">
        <div className="bg-[#EDEBF1] flex flex-col items-center justify-center text-center gap-4  p-10 rounded-xl md:rounded-lg min-h-[490px] lg:min-h-0">
          <h1 className="text-2xl leading-[34px] md:text-4xl lg:text-[44px] lg:leading-[58px] font-[400]">
            When Nine Rivers Meet,
            <br />
            <span className="text-primary">Wealth Flows</span>.
          </h1>
          <p className="text-secondary text-base md:text-lg leading-[31px]">
            Join a select circle of investors who value elite, boutique PMS
            strategies with a proven 12+ year track record in India&apos;s most
            dynamic businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <AnimatedButton label={"Download PMS Brochure"} /> */}
            <AnimatedButton
              label={"Start Your Journey"}
              variant="outline"
              onClick={handleRedirectTo}
              className="border border-[#070708] shadow-[inset_0_4px_4px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>

        <div className="relative rounded-xl md:rounded-lg overflow-hidden min-h-[490px] lg:min-h-0">
          <Image
            src={WealthFlow}
            alt="Wealth Flow"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </Container>
  );
};

export default WealthFlows;
