"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { NRC_Logo } from "@/assets/Home";
import { usePathname } from "next/navigation";
import AnimatedButton from "../ui/animatedButton";

const MobileNavbarDemo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [isLoaded, setIsLoaded] = useState(false);

  // Prevent initial animation by setting loaded state after mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navItems = [
    { name: "Home", hasDropdown: false, link: "/" },
    { name: "About us", hasDropdown: false, link: "/about" },
    { name: "Asset Management", hasDropdown: true, link: "#" },
    { name: "Corporate Advisory", hasDropdown: false, link: "/corporate-advisory" },
    { name: "Team", hasDropdown: false, link: "/team" },
    { name: "Insights", hasDropdown: false, link: "/insights" },
    { name: "Contact Us", hasDropdown: false, link: "/contact" },
  ];

  const dropdownItems = [
    { name: "PMS", link: "/pms" },
    { name: "AIF", link: "/aif" }
  ];

  const handleNavClick = (item:any) => {
    if (item.hasDropdown) {
      setExpandedDropdown(expandedDropdown === item.name ? null : item.name);
    } else {
      setActiveItem(item.name);
      setIsMenuOpen(false);
      setExpandedDropdown(null);
      // Navigate to the link
      window.location.href = item.link;
    }
  };

  const handleSubNavClick = (subItem:any) => {
    setIsMenuOpen(false);
    setExpandedDropdown(null);
    // Navigate to the link
    window.location.href = subItem.link;
  };

  return (
    <div>
      {/* Fixed Header - No initial animation, immediate positioning */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden block  transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo - Static positioning */}
          <a href="/" className="flex items-center cursor-pointer">
            <div className="w-15 h-8 rounded flex items-center justify-center">
              <Image src={NRC_Logo} alt="NRC Logo" width={60} height={26} />
            </div>
          </a>

          {/* Login Button & Menu Toggle - Static positioning */}
          <div className="flex items-center gap-3">
            <AnimatedButton
              label="Log In"
              variant="purple"
              className="px-4 py-2"
            />

            <button
              className="p-2 rounded-full transition-colors "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-black" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/45 backdrop-blur-[13px]"
            style={{ paddingTop: "80px" }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-6 py-8"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {/* Main Navigation Item */}
                    <div
                      className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={() => handleNavClick(item)}
                    >
                      <span
                        className={`text-2xl leading-[34px] transition-colors duration-200 ${activeItem === item.name
                            ? "text-black "
                            : "text-gray-600 "
                          }`}
                      >
                        {item.name}
                      </span>

                      {/* Dropdown Arrow */}
                      {item.hasDropdown && (
                        <motion.div
                          animate={{
                            rotate: expandedDropdown === item.name ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.71054 11.71L11.3005 14.3C11.6905 14.69 12.3205 14.69 12.7105 14.3L15.3005 11.71C15.9305 11.08 15.4805 10 14.5905 10H9.41054C8.52054 10 8.08054 11.08 8.71054 11.71Z"
                              fill="black"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    {/* Dropdown Items */}
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {expandedDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-transparent rounded-lg mt-2 py-2">
                              {dropdownItems.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.name}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: subIndex * 0.1,
                                  }}
                                  className="py-3 px-4 text-secondary cursor-pointer hover:bg-gray-100 hover:text-secondary rounded transition-colors duration-200 text-[20px] leading-[34px]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubNavClick(subItem);
                                  }}
                                >
                                  {subItem.name}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbarDemo;