'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  amount?: number;
  animation?: 'fold' | 'slide' | 'fade' | 'scale' | 'flip' | 'bounce' | 'elastic' | 'wave' | 'spiral' | 'magnetic' | 'glitch';
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  variant?: 'default' | 'title' | 'subtitle' | 'description' | 'card' | 'button';
  interactive?: boolean;
  staggerChildren?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  className = '',
  delay,
  duration,
  triggerOnce = true,
  amount = 0.1,
  animation = 'fold',
  direction = 'up',
  variant = 'default',
  interactive = false,
  staggerChildren = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: amount 
  });

  // Get timing based on variant
  const getVariantTiming = () => {
    switch (variant) {
      case 'title': return { duration: 1.2, delay: 0 };
      case 'subtitle': return { duration: 1.0, delay: 0.2 };
      case 'description': return { duration: 0.8, delay: 0.4 };
      case 'card': return { duration: 0.9, delay: 0.1 };
      case 'button': return { duration: 0.7, delay: 0.6 };
      default: return { duration: 0.8, delay: 0 };
    }
  };

  const variantConfig = getVariantTiming();
  const animationDelay = delay !== undefined ? delay : variantConfig.delay;
  const animationDuration = duration !== undefined ? duration : variantConfig.duration;

  // Get animation states
  const getAnimationStates = () => {
    switch (animation) {
      case 'fold':
        return {
          initial: { y: '100%', rotateX: 90, opacity: 0, transformOrigin: 'bottom' },
          animate: { y: '0%', rotateX: 0, opacity: 1, transformOrigin: 'bottom' },
          transition: { 
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeOut" as const
          }
        };

      case 'slide':
        const slideMap = {
          up: { y: 100 }, down: { y: -100 }, left: { x: 100 }, 
          right: { x: -100 }, center: { scale: 0.8 }
        };
        const slideInitial = slideMap[direction] || { y: 100 };
        return {
          initial: { ...slideInitial, opacity: 0 },
          animate: { x: 0, y: 0, scale: 1, opacity: 1 },
          transition: { 
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeOut" as const
          }
        };

      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { 
            duration: animationDuration * 1.5,
            delay: animationDelay
          }
        };

      case 'scale':
        return {
          initial: { scale: direction === 'center' ? 0 : 1.2, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { 
            type: "spring" as const, 
            stiffness: 200, 
            damping: 20,
            delay: animationDelay
          }
        };

      case 'flip':
        const flipProp = (direction === 'left' || direction === 'right') ? 'rotateY' : 'rotateX';
        return {
          initial: { [flipProp]: 90, opacity: 0, transformOrigin: 'center' },
          animate: { [flipProp]: 0, opacity: 1, transformOrigin: 'center' },
          transition: { 
            type: "spring" as const, 
            stiffness: 150, 
            damping: 15,
            delay: animationDelay
          }
        };

      case 'bounce':
        return {
          initial: { y: direction === 'down' ? -100 : 100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { 
            type: "spring" as const, 
            stiffness: 400, 
            damping: 8, 
            mass: 0.8,
            delay: animationDelay
          }
        };

      case 'elastic':
        return {
          initial: { scale: 0, rotate: -180, opacity: 0 },
          animate: { scale: 1, rotate: 0, opacity: 1 },
          transition: { 
            type: "spring" as const, 
            stiffness: 300, 
            damping: 12, 
            mass: 1.2,
            delay: animationDelay
          }
        };

      case 'wave':
        return {
          initial: { y: 50, rotateZ: -10, opacity: 0, transformOrigin: 'bottom left' },
          animate: { y: 0, rotateZ: 0, opacity: 1, transformOrigin: 'bottom left' },
          transition: { 
            type: "spring" as const, 
            stiffness: 200, 
            damping: 15,
            delay: animationDelay
          }
        };

      case 'spiral':
        return {
          initial: { scale: 0, rotate: 180, x: direction === 'left' ? -100 : 100, opacity: 0 },
          animate: { scale: 1, rotate: 0, x: 0, opacity: 1 },
          transition: { 
            type: "spring" as const, 
            stiffness: 250, 
            damping: 18,
            delay: animationDelay
          }
        };

      case 'magnetic':
        return {
          initial: { scale: 1.5, filter: 'blur(10px)', opacity: 0 },
          animate: { scale: 1, filter: 'blur(0px)', opacity: 1 },
          transition: { 
            type: "spring" as const, 
            stiffness: 300, 
            damping: 20,
            delay: animationDelay
          }
        };

      case 'glitch':
        return {
          initial: { opacity: 0, filter: 'hue-rotate(90deg)' },
          animate: { opacity: 1, filter: 'hue-rotate(0deg)' },
          transition: { 
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeOut" as const
          }
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { 
            duration: animationDuration,
            delay: animationDelay,
            ease: "easeOut" as const
          }
        };
    }
  };

  const { initial, animate, transition } = getAnimationStates();

  // Interactive hover props
  const hoverProps = interactive ? {
    whileHover: { 
      scale: animation === 'scale' ? 1.1 : 1.05,
      y: animation === 'bounce' ? -5 : -2,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    },
    whileTap: { 
      scale: 0.95,
      transition: { type: "spring" as const, stiffness: 400, damping: 25 }
    }
  } : {};

  // Stagger rendering
  if (staggerChildren) {
    return (
      <div ref={ref} className="overflow-hidden">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: animationDelay
              }
            }
          }}
          className={className}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            variants={{
              hidden: initial,
              visible: { ...animate, transition: { duration: animationDuration * 0.8 } }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Main rendering
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={initial}
        animate={isInView ? animate : initial}
        transition={transition}
        className={className}
        style={{ 
          transformStyle: 'preserve-3d',
          cursor: interactive ? 'pointer' : 'default'
        }}
        {...hoverProps}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Convenience components
export const FoldText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="fold" />
);

export const SlideText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="slide" />
);

export const FadeText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="fade" />
);

export const ScaleText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="scale" />
);

export const FlipText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="flip" />
);

export const BounceText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="bounce" />
);

export const ElasticText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="elastic" />
);

export const WaveText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="wave" />
);

export const SpiralText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="spiral" />
);

export const MagneticText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="magnetic" />
);

export const GlitchText = (props: Omit<AnimatedTextProps, 'animation'>) => (
  <AnimatedText {...props} animation="glitch" />
);

// Preset combinations
export const HeroTitle = (props: Omit<AnimatedTextProps, 'animation' | 'variant'>) => (
  <AnimatedText {...props} animation="elastic" variant="title" />
);

export const HeroSubtitle = (props: Omit<AnimatedTextProps, 'animation' | 'variant'>) => (
  <AnimatedText {...props} animation="slide" direction="up" variant="subtitle" />
);

export const HeroDescription = (props: Omit<AnimatedTextProps, 'animation' | 'variant'>) => (
  <AnimatedText {...props} animation="fade" variant="description" />
);

export const InteractiveCard = (props: Omit<AnimatedTextProps, 'animation' | 'variant' | 'interactive'>) => (
  <AnimatedText {...props} animation="scale" variant="card" interactive />
);

export const ActionButton = (props: Omit<AnimatedTextProps, 'animation' | 'variant' | 'interactive'>) => (
  <AnimatedText {...props} animation="bounce" variant="button" interactive />
);

export default AnimatedText;