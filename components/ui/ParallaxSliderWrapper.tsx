import React, { useState, useEffect, useRef } from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  animationType?: 'edge-left' | 'edge-right' | 'normal-left' | 'normal-right' | 'fade-up' | 'fade-down' | 'zoom-in' | 'zoom-out' | 'rotate-left' | 'rotate-right';
  staggerDelay?: number;
  triggerMode?: 'onetime' | 'always';
  initialDelay?: number;
  animationDuration?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  animationType = 'fade-up',
  staggerDelay = 200,
  triggerMode = 'onetime',
  initialDelay = 0,
  animationDuration = 700,
  threshold = 0.3,
  rootMargin = '0px 0px -100px 0px',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerMode === 'always') {
          setIsVisible(entry.isIntersecting);
        } else if (triggerMode === 'onetime') {
          if (entry.isIntersecting && !animationStarted) {
            setIsVisible(true);
            setAnimationStarted(true);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, [animationStarted, triggerMode, threshold, rootMargin]);

  // Get animation classes based on type and visibility
  const getAnimationClasses = (index: number) => {
    const baseClasses = 'transition-all ease-out';
    const duration = `duration-[${animationDuration}ms]`;
    
    if (!isVisible) {
      switch (animationType) {
        case 'edge-left':
          return `${baseClasses} ${duration} transform -translate-x-full opacity-0 scale-95`;
        case 'edge-right':
          return `${baseClasses} ${duration} transform translate-x-full opacity-0 scale-95`;
        case 'normal-left':
          return `${baseClasses} ${duration} transform -translate-x-32 opacity-0 scale-95`;
        case 'normal-right':
          return `${baseClasses} ${duration} transform translate-x-32 opacity-0 scale-95`;
        case 'fade-up':
          return `${baseClasses} ${duration} transform translate-y-12 opacity-0 scale-95`;
        case 'fade-down':
          return `${baseClasses} ${duration} transform -translate-y-12 opacity-0 scale-95`;
        case 'zoom-in':
          return `${baseClasses} ${duration} transform scale-50 opacity-0`;
        case 'zoom-out':
          return `${baseClasses} ${duration} transform scale-150 opacity-0`;
        case 'rotate-left':
          return `${baseClasses} ${duration} transform -rotate-45 -translate-x-16 opacity-0 scale-75`;
        case 'rotate-right':
          return `${baseClasses} ${duration} transform rotate-45 translate-x-16 opacity-0 scale-75`;
        default:
          return `${baseClasses} ${duration} transform translate-y-12 opacity-0 scale-95`;
      }
    }
    
    return `${baseClasses} ${duration} transform translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100`;
  };

  // Clone children and add animation classes
  const animatedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as any;
      const existingClassName = childProps?.className || '';
      const existingStyle = childProps?.style || {};
      
      return React.cloneElement(child as React.ReactElement<any>, {
        ...childProps,
        className: `${existingClassName} ${getAnimationClasses(index)}`.trim(),
        style: {
          ...existingStyle,
          transitionDelay: isVisible ? `${initialDelay + (index * staggerDelay)}ms` : '0ms'
        }
      });
    }
    return child;
  });

  return (
    <div 
      ref={wrapperRef}
      className={`overflow-hidden ${className}`}
    >
      {animatedChildren}
    </div>
  );
};



export default ParallaxWrapper;