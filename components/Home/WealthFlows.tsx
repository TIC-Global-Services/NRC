import Image from "next/image";
import AnimatedButton from "../ui/animatedButton";
import SlideUpText from "../ui/SlideUpText";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const RedirectToContact = () => {
    router.push("/contact")
  }
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-[100vh] flex items-start pt-40 justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wealthflow.png"
          alt="Nine Rivers Bridge"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/0" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 z-20 bg-gradient-to-b from-[#F6F9FC] via-[#F6F9FC] to-transparent backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-9">
        <SlideUpText animationMode="always">
          <h1 className="text-[26px] leading-8 sm:text-5xl  font-normal md:leading-[57px] text-balance mb-8">
            <span className="text-black">When Nine Rivers Meet,</span>
            <br />
            <span className="text-primary">Wealth Flows.</span>
          </h1>
        </SlideUpText>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <AnimatedButton onClick={RedirectToContact} label="Schedule a Call" />

          {/* <AnimatedButton
            label="Download Brochure"
            variant="outline"
            className="border border-[#070708] shadow-[inset_0_4px_4px_rgba(255,255,255,0.3)]"
          /> */}
        </div>
      </div>
    </section>
  );
}
