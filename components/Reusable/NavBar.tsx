"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Container from "./Container";
import Image from "next/image";
import { NRC_Logo } from "@/assets/Home";
import { usePathname } from "next/navigation";
import AnimatedButton from "../ui/animatedButton";
import { useHeroScroll } from "@/context/HeroScrollContext";

// Define types
interface NavItemType {
  name: string;
  hasDropdown: boolean;
  link: string;
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  index: number;
  link: string;
  onDropdownToggle: () => void;
  isDropdownOpen: boolean;
}

interface NavbarProps {
  visibility?: boolean;
  isHomePage?: boolean;
}

// Constants moved outside component to prevent recreation
const SCROLL_THRESHOLD = 50;
const HIDE_THRESHOLD = 100;

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

// Memoized NavItem component
const NavItem = React.memo<NavItemProps>(
  ({ item, isActive, index, link, onDropdownToggle, isDropdownOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
      hasAnimatedRef.current = true;
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (item.hasDropdown) {
          e.preventDefault();
          onDropdownToggle();
        } else {
          window.location.href = link;
        }
      },
      [item.hasDropdown, link, onDropdownToggle]
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
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

        <motion.a
          href={link}
          className={`font-medium ml-1 text-sm [@media(min-width:1000px)]:text-[14px] [@media(min-width:1200px)]:text-base ${
            isActive
              ? "text-[#6A48E8] font-semibold"
              : "text-[#484848] hover:text-gray-800"
          }`}
          animate={{ color: isActive ? "#6A48E8" : "#484848" }}
          transition={{ duration: 0.3 }}
        >
          {item.name}
        </motion.a>

        {item.hasDropdown && (
          <motion.div
            className="ml-1"
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <ChevronDown className="w-4 h-4 text-black" />
          </motion.div>
        )}

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
              initial={{ opacity: 0, y: -15, scale: 0.9, rotateX: -15 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                transition: { duration: 0.4, type: "spring", stiffness: 150 },
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.9,
                rotateX: -15,
                transition: { duration: 0.2 },
              }}
            >
              {DROPDOWN_ITEMS.map((subItem, subIndex) => (
                <motion.a
                  key={subItem.name}
                  href={subItem.link}
                  className={`text-base py-3 px-6 text-secondary cursor-pointer transition-all duration-200 flex flex-row items-center justify-start gap-[10px] ${
                    subItem.name === "PMS" ? "md:border-b border-[#E7E3F7]" : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: subIndex * 0.1 + 0.2, duration: 0.3 },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = subItem.link;
                  }}
                >
                  <div className="w-1 h-1 bg-black hover:text-black rounded-full"></div>
                  {subItem.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

NavItem.displayName = "NavItem";

const Navbar: React.FC<NavbarProps> = ({
  visibility = true,
  isHomePage = false,
}) => {
  const { isHeroScrolled, isHeroContentRevealed } = useHeroScroll();
  const pathname = usePathname();

  // State management
  const [activeItem, setActiveItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Refs for performance
  const lastScrollYRef = useRef(0);
  const ticking = useRef(false);

  const handleLoginRoute = () => {
    window.open("https://faconnect.kotak.com", "_blank");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHome = useMemo(
    () => mounted && pathname === "/",
    [mounted, pathname]
  );

  // Memoized active item calculation
  const getActiveItem = useCallback((currentPath: string): string => {
    if (typeof window === "undefined") return "Home";

    const currentUrl = window.location.pathname + window.location.hash;

    // Check if current path is /pms or /aif - these should activate "Asset Management"
    if (currentPath === "/pms" || currentPath === "/aif") {
      return "Asset Management";
    }

    // Check if path starts with a nav item path (for nested routes)
    for (const item of NAV_ITEMS) {
      if (
        item.link !== "#" &&
        item.link !== "/" &&
        currentPath.startsWith(item.link)
      ) {
        return item.name;
      }
    }

    // Direct match
    const exactMatch = NAV_ITEMS.find((item) => item.link === currentUrl);
    if (exactMatch) return exactMatch.name;

    // Path match without hash
    if (!currentUrl.includes("#")) {
      const pathMatch = NAV_ITEMS.find(
        (item) => item.link === currentUrl && !item.link.includes("#")
      );
      if (pathMatch) return pathMatch.name;
    }

    // Check if we're on the home page
    if (currentPath === "/") {
      return "Home";
    }

    return "Home";
  }, []);

  // Set active item based on pathname
  useEffect(() => {
    const active = getActiveItem(pathname);
    setActiveItem(active);
  }, [pathname, getActiveItem]);

  // Optimized scroll handler using RAF
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;

          // Update scrolled state
          const scrolled = currentScrollY > SCROLL_THRESHOLD;
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
          }

          if (isHome) {
            // HOME PAGE LOGIC
            if (isHeroContentRevealed && !isHeroScrolled) {
              // Content is revealed but still in hero section → ALWAYS SHOW navbar
              if (!isVisible) setIsVisible(true);
            } else if (isHeroScrolled) {
              // Scrolled past hero section → Normal scroll behavior
              const scrollingUp = currentScrollY < lastScrollY;
              const scrollingDown =
                currentScrollY > lastScrollY && currentScrollY > HIDE_THRESHOLD;

              if (scrollingUp && !isVisible) {
                setIsVisible(true);
              } else if (scrollingDown && isVisible) {
                setIsVisible(false);
                setIsDropdownOpen(false);
              }
            } else {
              // Content not revealed yet → HIDE navbar
              if (isVisible) setIsVisible(false);
            }
          } else {
            // OTHER PAGES: Normal scroll behavior
            const scrollingUp = currentScrollY < lastScrollY;
            const scrollingDown =
              currentScrollY > lastScrollY && currentScrollY > HIDE_THRESHOLD;

            if (scrollingUp && !isVisible) {
              setIsVisible(true);
            } else if (scrollingDown && isVisible) {
              setIsVisible(false);
              setIsDropdownOpen(false);
            }
          }

          lastScrollYRef.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, isHeroContentRevealed, isHeroScrolled, isScrolled, isVisible]);

  // Memoized navbar visibility calculation
  const shouldShowNavbar = useMemo(() => {
    if (isHome) {
      // On home page: Show navbar if content is revealed AND isVisible is true
      return isHeroContentRevealed && isVisible;
    }
    // Other pages: Normal visibility
    return isVisible;
  }, [isHome, isHeroContentRevealed, isVisible]);

  // Memoized dropdown toggle
  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // Memoized navbar background class
  const navbarBgClass = useMemo(() => {
    return isHeroScrolled
      ? "bg-white border-[#E5E5E5]"
      : "bg-white/30 backdrop-blur-[20px] border-white/30";
  }, [isHeroScrolled]);

  return (
    <motion.div
      className="fixed left-0 right-0 w-full hidden lg:block z-[999]"
      style={{ top: isHomePage ? "24px" : "40px" }}
      initial={{ y: -120, opacity: 0 }}
      animate={{
        y: shouldShowNavbar ? 0 : -120,
        opacity: visibility && shouldShowNavbar ? 1 : 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
          duration: 0.6,
        },
      }}
    >
      <Container isNavbar>
        <nav
          className={`rounded-full px-8 2xl:py-4 md:py-3 grid grid-cols-[auto_1fr_auto] items-center transition-all duration-300 ${navbarBgClass} border`}
        >
          <motion.a
            className="flex items-center justify-start"
            href="/"
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
          </motion.a>

          <div className="flex items-center justify-center gap-6">
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={activeItem === item.name}
                index={index}
                link={item.link}
                onDropdownToggle={handleDropdownToggle}
                isDropdownOpen={item.hasDropdown && isDropdownOpen}
              />
            ))}
          </div>

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
              onClick={handleLoginRoute}
              label="Log In"
              variant="purple"
              className="[@media(min-width:1000px)]:px-4 [@media(min-width:1000px)]:py-1.5 [@media(min-width:1200px)]:px-5 [@media(min-width:1200px)]:py-2"
            />
          </motion.div>
        </nav>
      </Container>
    </motion.div>
  );
};

export default Navbar;
