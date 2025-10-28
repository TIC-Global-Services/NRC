import React from "react";
import ContactForm from "./Form";
import Container from "../Reusable/Container";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import SlideUpText from "../ui/SlideUpText";
import { AiFillInstagram } from "react-icons/ai";

const FormSection = () => {
  return (
    <Container
      disableYSpacing
      className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0 bg-[#F6F9FC] lg:mt-32 lg:mb-36 mt-[70px]"
    >
      <div className="flex flex-col justify-between items-start gap-6 lg:gap-0">
        {/* Heading */}
        <SlideUpText animationMode="always">
          <h2 className="text-4xl lg:text-6xl font-medium text-gray-900 max-w-3xl leading-tight">
            Join Us in Creating <br /> Something Great
          </h2>
        </SlideUpText>

        {/* Social Icons */}
        <div className="flex flex-col gap-5">
          <SlideUpText animationMode="always">
            <h1 className="text-xl lg:text-3xl">Connect with us</h1>
          </SlideUpText>
          <div className="flex lg:space-x-8 space-x-3">
            <a
              href="https://in.linkedin.com/company/nine-rivers-capital"
              className="text-white rounded-full flex items-center justify-center w-10 h-10 bg-black 
hover:-translate-y-0.5 hover:scale-[1.02] 
transition-all duration-300 ease-in-out"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
              {/* <Linkedin size={28} /> */}
            </a>
            <a
              href="https://www.instagram.com/nineriverscapital/"
              className="text-white rounded-full flex items-center justify-center w-10 h-10 bg-black 
hover:-translate-y-0.5 hover:scale-[1.02] 
transition-all duration-300 ease-in-out"
              aria-label="YouTube"
            >
              <AiFillInstagram size={16} />
              {/* <Youtube size={28} /> */}
            </a>
            <a
              href="https://x.com/9RiversCapital"
              className="text-white rounded-full flex items-center justify-center w-10 h-10 bg-black 
hover:-translate-y-0.5 hover:scale-[1.02] 
transition-all duration-300 ease-in-out"
              aria-label="Twitter / X"
            >
              <BsTwitterX size={16} />
              {/* <Twitter size={28} /> */}
            </a>
          </div>
        </div>
      </div>

      <div>
        <ContactForm />
      </div>
    </Container>
  );
};

export default FormSection;
