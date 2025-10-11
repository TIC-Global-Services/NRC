import React from "react";
import ContactForm from "./Form";
import Container from "../Reusable/Container";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import SlideUpText from "../ui/SlideUpText";


const FormSection = () => {
  return (
    <Container disableYSpacing className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0 bg-[#F6F9FC] md:mt-32 md:mb-36 mt-[70px]">
      <div
        className="flex flex-col justify-between items-start gap-6 md:gap-0"
      >
        {/* Heading */}
        <SlideUpText animationMode="always">
          <h2 className="text-4xl md:text-6xl font-medium text-gray-900 max-w-3xl leading-tight">
            Join Us in Creating <br /> Something Great
          </h2>
        </SlideUpText>

        {/* Social Icons */}
        <div className="flex flex-col gap-5">
          <SlideUpText animationMode="always">
            <h1 className="text-xl md:text-3xl">
              Connect with us
            </h1>
          </SlideUpText>
          <div className="flex md:space-x-8 space-x-3">
            <a
              href="#"
              className="text-white rounded-full flex items-center justify-center w-10 h-10 bg-black hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
              {/* <Linkedin size={28} /> */}
            </a>
            <a
              href="#"
              className="text-white rounded-full flex items-center justify-center w-10 h-10 bg-black hover:text-red-600 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={16} />
              {/* <Youtube size={28} /> */}
            </a>
            <a
              href="#"
              className="text-white rounded-full flex items-center justify-center w-10 h-10 bg-black hover:text-black transition-colors"
              aria-label="Twitter / X"
            >
              <BsTwitterX size={16} />
              {/* <Twitter size={28} /> */}
            </a>
          </div>
        </div>
      </div>

      <div
      >
        <ContactForm />
      </div>
    </Container>
  );
};

export default FormSection;
