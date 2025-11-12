"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "./Container";
import Image from "next/image";
import { NRC_Logo } from "@/assets/Home";
import { usePathname, useRouter } from "next/navigation";
import AnimatedButton from "../ui/animatedButton";
import { useHeroScroll } from "@/context/HeroScrollContext";
import Link from "next/link";

interface NavItemType {
  name: string;
  hasDropdown: boolean;
  link: string;
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  index: number;
  onDropdownToggle: () => void;
  isDropdownOpen: boolean;
}

interface NavbarProps {
  visibility?: boolean;
  isHomePage?: boolean;
}

const NAV_ITEMS: NavItemType[] = [
  { name: "Home", hasDropdown: false, link: "/" },
  { name: "About us", hasDropdown: false, link: "/about" },
  { name: "Asset Management", hasDropdown: true, link: "#" },
  {
    name: "Corporate Advisory",
    hasDropdown: false,
    link: "/corporate-advisory",
  },
  { name: "Team", hasDropdown: false, link: "/team" },
  { name: "Insights", hasDropdown: false, link: "/insights" },
  { name: "Contact Us", hasDropdown: false, link: "/contact" },
];

const DROPDOWN_ITEMS = [
  { name: "PMS", link: "/pms" },
  { name: "AIF", link: "/aif" },
];

// === NavItem ===
const NavItem = React.memo<NavItemProps>(
  ({ item, isActive, index, onDropdownToggle, isDropdownOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasAnimatedRef = useRef(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
      hasAnimatedRef.current = true;
    }, []);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isDropdownOpen &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onDropdownToggle(); // Close it
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen, onDropdownToggle]);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (item.hasDropdown) {
          e.preventDefault();
          onDropdownToggle();
        }
      },
      [item.hasDropdown, onDropdownToggle]
    );

    const handleDropdownClick = useCallback(
      (link: string) => {
        onDropdownToggle(); // ✅ Close dropdown before navigating
        router.push(link); // ✅ Client-side navigation
      },
      [onDropdownToggle, router]
    );

    return (
      <motion.div
        className="relative flex items-center cursor-pointer"
        initial={!hasAnimatedRef.current ? { opacity: 0, y: -15 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
          duration: 0.3,
          delay: !hasAnimatedRef.current ? index * 0.05 : 0,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
        ref={dropdownRef}
      >
        {/* hover dot */}
        <div className="w-2 flex justify-center">
          <AnimatePresence>
            {isHovered && !isActive && (
              <motion.div
                className="w-1 h-1 rounded-full bg-black"
                initial={{ opacity: 0, scale: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  x: -10,
                  transition: { duration: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ✅ Use Link for normal items */}
        <Link
          href={item.link === "#" ? "" : item.link}
          onClick={handleClick}
          className={`font-medium ml-1 text-sm [@media(min-width:1000px)]:text-[14px] [@media(min-width:1200px)]:text-base ${
            isActive
              ? "text-[#6A48E8] font-semibold"
              : "text-[#484848] hover:text-gray-800"
          }`}
        >
          {item.name}
        </Link>

        {/* Dropdown arrow */}
        {item.hasDropdown && (
          <motion.div
            className="ml-1 cursor-pointer"
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            onClick={handleClick} // ✅ Added this line
          >
            <ChevronDown className="w-4 h-4 text-black" />
          </motion.div>
        )}

        {/* Dropdown menu */}
        <AnimatePresence>
          {item.hasDropdown && isDropdownOpen && (
            <motion.div
              className="absolute top-full mt-6 left-0 rounded-2xl min-w-[200px] z-50"
              style={{
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #FFFFFF1A",
                boxShadow: "0px 48px 100px 0px #110C2E26",
                background: "#FFFFFF52",
              }}
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, type: "spring", stiffness: 150 },
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
            >
              {DROPDOWN_ITEMS.map((subItem, subIndex) => (
                <motion.button
                  key={subItem.name}
                  className={`w-full text-left text-base cursor-pointer py-3 px-6 text-secondary transition-all duration-200 flex flex-row items-center justify-start gap-[10px] ${
                    subItem.name === "PMS" ? "md:border-b border-[#E7E3F7]" : ""
                  } hover:text-black`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: subIndex * 0.1 + 0.2, duration: 0.3 },
                  }}
                  onClick={() => handleDropdownClick(subItem.link)} // ✅ navigate + close
                >
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  {subItem.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

NavItem.displayName = "NavItem";

// === Navbar ===
const Navbar: React.FC<NavbarProps> = ({
  visibility = true,
  isHomePage = false,
}) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setIsDropdownOpen(false), [pathname]);

  const isHome = useMemo(
    () => mounted && pathname === "/",
    [mounted, pathname]
  );

  const getActiveItem = useCallback((currentPath: string): string => {
    if (currentPath === "/pms" || currentPath === "/aif")
      return "Asset Management";
    const match = NAV_ITEMS.find((item) => item.link === currentPath);
    return match ? match.name : "Home";
  }, []);

  useEffect(() => {
    setActiveItem(getActiveItem(pathname));
  }, [pathname, getActiveItem]);

  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  return (
    <motion.div
      className="fixed top-4 left-0 right-0 w-full hidden lg:block z-[999]"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: visibility ? 1 : 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.6,
        },
      }}
    >
      <Container isNavbar>
        <nav
          className={`rounded-full px-8 2xl:py-4 md:py-3 grid grid-cols-[auto_1fr_auto] items-center transition-all duration-300 bg-white/30 backdrop-blur-[20px] border-white/30 border`}
        >
          {/* ✅ Logo link */}
          <Link href="/" className="flex items-center justify-start">
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 12,
                  duration: 0.6,
                  delay: 0.5,
                },
              }}
              whileHover={{
                scale: 1.08,
                rotate: 2,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={NRC_Logo}
                alt="LogoImg"
                width={80}
                height={34}
                className="[@media(min-width:1000px)]:w-[65px] [@media(min-width:1000px)]:h-[28px] [@media(min-width:1200px)]:w-[80px] [@media(min-width:1200px)]:h-[34px]"
              />
            </motion.div>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center justify-center gap-6">
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={activeItem === item.name}
                index={index}
                onDropdownToggle={handleDropdownToggle}
                isDropdownOpen={item.hasDropdown && isDropdownOpen}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="flex items-center justify-end"
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 150,
                damping: 12,
                duration: 0.6,
                delay: 0.8,
              },
            }}
          >
            <AnimatedButton
              label="Log In"
              variant="purple"
              onClick={() =>
                window.open("https://faconnect.kotak.com", "_blank")
              }
              className="[@media(min-width:1000px)]:px-4 [@media(min-width:1000px)]:py-1.5 [@media(min-width:1200px)]:px-5 [@media(min-width:1200px)]:py-2"
            />
          </motion.div>
        </nav>
      </Container>
    </motion.div>
  );
};

export default Navbar;
