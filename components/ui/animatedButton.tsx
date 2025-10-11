"use client"
import { motion } from "framer-motion"

type ButtonVariant = "default" | "purple" | "gradient" | "outline"

interface AnimatedButtonProps {
  label: string
  onClick?: () => void
  delay?: number
  className?: string
  isBtnScale?: boolean
  variant?: ButtonVariant
}

export const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "default":
      return {
        button: "bg-black text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.3)]",
        dot: "bg-white",
      }
    case "purple":
      return {
        button: "bg-[#6A48E8] text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.3)]",
        dot: "bg-white",
      }
    case "gradient":
      return {
        button:
          "bg-gradient-to-r from-[#6A48E8] to-[#E5DEFE] text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.3)]",
        dot: "bg-white",
      }
    case "outline":
      return {
        button: "bg-transparent border border-[#070708] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.3)]",
        dot: "bg-[#070708]",
      }
    default:
      return {
        button: "bg-black text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.3)]",
        dot: "bg-white",
      }
  }
}

const AnimatedButton = ({ isBtnScale = true, label, onClick, delay = 0.3, className = "", variant = "default" }: AnimatedButtonProps) => {

  const styles = getVariantStyles(variant)

  return (
    <motion.div
      className="inline-block sfPro"
      // initial={{ y: 50, opacity: 0 }}
      // animate={{ y: 0, opacity: 1 }}
      // transition={{
      //   type: "spring",
      //   stiffness: 120,
      //   damping: 15,
      //   delay,
      // }}
    >
      <motion.button
        onClick={onClick}
        className={`${styles.button} cursor-pointer px-4 py-2 md:px-5 md:py-2 rounded-full md:text-base font-[400] flex items-center gap-2 md:gap-2 text-sm transition-colors duration-300 ${className}`}
        whileHover={{
          scale: isBtnScale ? 1.04 : "1",
        }}
        whileTap={{ scale: 0.95 }}
      >
        {label}

        {/* Animated Dot */}
        <motion.div
          className={`md:w-2 md:h-2 w-1.5 h-1.5 ${styles.dot} rounded-full`}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </motion.div>
  )
}

export default AnimatedButton
