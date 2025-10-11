import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

interface SlideUpTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  animationMode?: 'always' | 'once';
  threshold?: number;
  splitText?: boolean;
  splitBy?: 'words' | 'chars';
  staggerDelay?: number;
  as?: React.ElementType;
}

const SlideUpText: React.FC<SlideUpTextProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  distance = 50,
  animationMode = 'always',
  threshold = 0.1,
  splitText = false,
  splitBy = 'words',
  staggerDelay = 0.1,
  as = 'div',
}) => {
  const triggerOnce = animationMode === 'once';

  // Memoize viewport settings
  const viewportSettings = useMemo(() => ({
    once: triggerOnce,
    amount: animationMode === 'always' ? 0.01 : threshold,
    margin: animationMode === 'always' ? "0px 0px -10px 0px" : "0px 0px -50px 0px",
  }), [triggerOnce, animationMode, threshold]);

  // Memoize animation variants
  const itemVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: distance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  }), [distance, duration]);

  const containerVariants: Variants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  }), [staggerDelay, delay]);

  // Function to extract text from React nodes recursively
  const extractTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      const element = children as React.ReactElement<{ children?: React.ReactNode }>;
      if (element.props && element.props.children) {
        return extractTextFromChildren(element.props.children);
      }
      return '';
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join('');
    }
    return '';
  };

  // Determine if we're dealing with text content or React elements
  const childrenArray = React.Children.toArray(children);
  const hasReactElements = childrenArray.some(child => React.isValidElement(child));
  const isTextOnly = childrenArray.every(child => typeof child === 'string' || typeof child === 'number');

  // Get the appropriate HTML tag for the wrapper
  const getWrapperTag = (defaultTag: React.ElementType): React.ElementType => {
    // If 'as' prop is provided, use it
    if (as !== 'div') return as;

    // Auto-detect based on context - use span for inline contexts
    return defaultTag;
  };

  // Split text animation
  if (splitText) {
    const textContent = extractTextFromChildren(children);

    if (textContent) {
      const elements = splitBy === 'words'
        ? textContent.split(' ')
        : textContent.split('');

      const MotionComponent = motion(getWrapperTag('span'));

      return (
        <MotionComponent
          className={className}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={containerVariants}
        >
          {elements.map((element, index) => (
            <motion.span
              key={`${element}-${index}`}
              variants={itemVariants}
              style={{ display: 'inline-block' }}
            >
              {element}{splitBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
        </MotionComponent>
      );
    }
  }

  // For React elements or mixed content - use span to avoid hydration errors
  if (hasReactElements || !isTextOnly) {
    const MotionComponent = motion(getWrapperTag('span'));

    return (
      <MotionComponent
        initial={{
          opacity: 0,
          y: distance
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={viewportSettings}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={className}
        style={{ display: 'inline-block', width: '100%' }}
      >
        {children}
      </MotionComponent>
    );
  }

  // Regular animation for simple text content
  const MotionComponent = motion(getWrapperTag('span'));

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        y: distance
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={viewportSettings}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{ display: 'inline-block', width: '100%' }}
    >
      {children}
    </MotionComponent>
  );
};

export default React.memo(SlideUpText);