"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NRC_Logo } from "@/assets/Home";
import { usePathname, useRouter } from "next/navigation";
import AnimatedButton from "../ui/animatedButton";

const MobileNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => setIsLoaded(true), []);

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
    { name: "AIF", link: "/aif" },
  ];

  const getActiveItem = (currentPath: string): string => {
    if (currentPath === "/pms" || currentPath === "/aif") return "Asset Management";
    for (const item of navItems) {
      if (item.link !== "#" && currentPath.startsWith(item.link)) return item.name;
    }
    if (currentPath === "/") return "Home";
    return "Home";
  };

  useEffect(() => {
    const active = getActiveItem(pathname);
    setActiveItem(active);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (item: any) => {
    if (item.hasDropdown) {
      setExpandedDropdown(expandedDropdown === item.name ? null : item.name);
    } else {
      setActiveItem(item.name);
      setIsMenuOpen(false);
      setExpandedDropdown(null);
      router.push(item.link);
    }
  };

  const handleSubNavClick = (subItem: any) => {
    setIsMenuOpen(false);
    setExpandedDropdown(null);
    router.push(subItem.link);
  };

  const handleLoginRoute = () => {
    window.open("https://faconnect.kotak.com", "_blank");
  };

  return (
    <div className="relative z-[999]">
      {/* Header */}
      <div
        className={` absolute top-0 w-full z-50 lg:hidden block transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="w-15 h-8 flex items-center justify-center">
              <Image src={NRC_Logo} alt="NRC Logo" width={60} height={26} />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <AnimatedButton
              onClick={handleLoginRoute}
              label="Log In"
              variant="purple"
              className="px-4 py-2"
            />

            <button
              className="p-2 rounded-full transition-colors"
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

      {/* Menu Overlay */}
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
                    <div
                      className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      onClick={() => handleNavClick(item)}
                    >
                      <span
                        className={`text-2xl leading-[34px] transition-colors duration-200 ${
                          activeItem === item.name ? "text-black" : "text-gray-600"
                        }`}
                      >
                        {item.name}
                      </span>

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

                    {/* Dropdown */}
                    {item.hasDropdown && expandedDropdown === item.name && (
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
                            >
                              <Link
                                href={subItem.link}
                                className="block py-3 px-4 text-secondary hover:bg-gray-100 hover:text-secondary rounded transition-colors duration-200 text-[20px] leading-[34px]"
                                onClick={() => handleSubNavClick(subItem)}
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
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

export default MobileNavbar;
