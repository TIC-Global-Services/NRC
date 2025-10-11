'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface PaperFoldTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  amount?: number;
  variant?: 'default' | 'title' | 'subtitle' | 'description' | 'card' | 'button';
  interactive?: boolean;
  staggerChildren?: boolean;
}

const PaperFoldText: React.FC<PaperFoldTextProps> = ({ 
  children, 
  className = '',
  delay,
  duration,
  triggerOnce = true,
  amount = 0.1,
  variant = 'default',
  interactive = false,
  staggerChildren = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: amount 
  });

  // Define timing based on variant
  const getVariantTiming = () => {
    switch (variant) {
      case 'title':
        return { duration: 1.0, delay: 0, rotateX: 95, scale: 0.9 };
      case 'subtitle':
        return { duration: 0.9, delay: 0.2, rotateX: 85, scale: 1 };
      case 'description':
        return { duration: 0.7, delay: 0.4, rotateX: 75, scale: 1 };
      case 'card':
        return { duration: 0.8, delay: 0.1, rotateX: 90, scale: 0.95 };
      case 'button':
        return { duration: 0.6, delay: 0.6, rotateX: 90, scale: 1 };
      default:
        return { duration: 0.8, delay: 0, rotateX: 90, scale: 1 };
    }
  };

  const variantConfig = getVariantTiming();
  const animationDelay = delay !== undefined ? delay : variantConfig.delay;
  const animationDuration = duration !== undefined ? duration : variantConfig.duration;

  // Main animation variants
  const paperFoldVariants: Variants = {
    hidden: {
      y: '100%',
      rotateX: variantConfig.rotateX,
      opacity: 0,
      scale: variantConfig.scale,
      transformOrigin: 'bottom'
    },
    visible: {
      y: '0%',
      rotateX: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'bottom',
      transition: {
        duration: animationDuration,
        delay: animationDelay,
        ease: "easeOut",
        opacity: {
          duration: animationDuration * 0.6,
          delay: animationDelay + (animationDuration * 0.2)
        }
      }
    }
  };

  // Interactive hover variants
  const interactiveVariants: Variants = {
    hidden: {
      y: '100%',
      rotateX: variantConfig.rotateX,
      opacity: 0,
      scale: variantConfig.scale,
      transformOrigin: 'bottom'
    },
    visible: {
      y: '0%',
      rotateX: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'bottom',
      transition: {
        duration: animationDuration,
        delay: animationDelay,
        ease: "easeOut",
        opacity: {
          duration: animationDuration * 0.6,
          delay: animationDelay + (animationDuration * 0.2)
        }
      }
    },
    hover: {
      y: '-4px',
      rotateX: -2,
      scale: 1.02,
      transformOrigin: 'bottom',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      y: '2px',
      rotateX: 2,
      scale: 0.98,
      transformOrigin: 'bottom',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Stagger container variants
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: animationDelay
      }
    }
  };

  // Child stagger variants
  const staggerChild: Variants = {
    hidden: {
      y: '100%',
      rotateX: 90,
      opacity: 0,
      transformOrigin: 'bottom'
    },
    visible: {
      y: '0%',
      rotateX: 0,
      opacity: 1,
      transformOrigin: 'bottom',
      transition: {
        duration: animationDuration * 0.8,
        ease: "easeOut"
      }
    }
  };

  if (staggerChildren) {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={className}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            variants={staggerChild}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (interactive) {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          variants={interactiveVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          whileTap="tap"
          className={className}
          style={{ 
            transformStyle: 'preserve-3d',
            cursor: 'pointer'
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        variants={paperFoldVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Convenience components with predefined settings
export const PaperFoldTitle: React.FC<Omit<PaperFoldTextProps, 'variant'>> = (props) => (
  <PaperFoldText {...props} variant="title" />
);

export const PaperFoldSubtitle: React.FC<Omit<PaperFoldTextProps, 'variant'>> = (props) => (
  <PaperFoldText {...props} variant="subtitle" />
);

export const PaperFoldDescription: React.FC<Omit<PaperFoldTextProps, 'variant'>> = (props) => (
  <PaperFoldText {...props} variant="description" />
);

export const PaperFoldCard: React.FC<Omit<PaperFoldTextProps, 'variant'>> = (props) => (
  <PaperFoldText {...props} variant="card" interactive />
);

export const PaperFoldButton: React.FC<Omit<PaperFoldTextProps, 'variant'>> = (props) => (
  <PaperFoldText {...props} variant="button" interactive />
);

export default PaperFoldText;