import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";

type Alignment = "left" | "center" | "right";

interface FlexibleHeadingProps {
  title: string;
  mobileTitle?: string;
  mdTitle?: string;
  highlights?: Record<string, string>;
  alignment?: Alignment;
  mobileAlignment?: Alignment;
  description?: string;
  mobileDescription?: string;
  showDescription?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  maxWidth?: string;
  isMB?: boolean;
}

const FlexibleHeading: React.FC<FlexibleHeadingProps> = ({
  title,
  mobileTitle,
  mdTitle,
  highlights = {},
  alignment = "center",
  mobileAlignment,
  description = "",
  mobileDescription,
  showDescription = true,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  maxWidth = "max-w-4xl",
  isMB = true,
}) => {
  // Use mobileAlignment if provided, otherwise fall back to alignment
  const effectiveMobileAlignment = mobileAlignment || alignment;

  const alignmentClasses: Record<Alignment, string> = {
    left: "md:text-left",
    center: "md:text-center",
    right: "md:text-right",
  };

  const mobileAlignmentClasses: Record<Alignment, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const descriptionAlignmentClasses: Record<Alignment, string> = {
    left: "md:mx-0",
    center: "md:mx-auto",
    right: "md:ml-auto md:mr-0",
  };

  const mobileDescriptionAlignmentClasses: Record<Alignment, string> = {
    left: "mx-0",
    center: "mx-auto",
    right: "ml-auto mr-0",
  };

  // Animation variants matching SlideUpText smoothness
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const viewportSettings = {
    once: true,
    amount: 0.1 as const,
    margin: "0px 0px -50px 0px",
  };

  // Function to render highlighted title
  const renderHighlightedTitle = (titleText: string): React.ReactNode => {
    if (Object.keys(highlights).length === 0) {
      // No highlights, just handle <br/> tags
      return titleText.split("<br/>").map((part, index) => (
        <React.Fragment key={`title-part-${index}`}>
          {part}
          {index < titleText.split("<br/>").length - 1 && <br />}
        </React.Fragment>
      ));
    }

    // Split title by <br/> tags first
    const titleParts = titleText.split("<br/>");

    return titleParts.map((titlePart, titleIndex) => (
      <React.Fragment key={`title-section-${titleIndex}`}>
        {(() => {
          let parts: Array<{ text: string; className: string }> = [
            { text: titlePart, className: "" },
          ];

          // Process each highlight phrase for this title part
          Object.entries(highlights).forEach(([phrase, className]) => {
            const newParts: Array<{ text: string; className: string }> = [];

            parts.forEach((part) => {
              if (part.className || !part.text.includes(phrase)) {
                // If already highlighted or doesn't contain phrase, keep as is
                newParts.push(part);
              } else {
                // Split the text around the phrase
                const textParts = part.text.split(phrase);
                for (let i = 0; i < textParts.length; i++) {
                  if (i > 0) {
                    // Add the highlighted phrase
                    newParts.push({ text: phrase, className: className });
                  }
                  if (textParts[i]) {
                    // Add the non-highlighted text
                    newParts.push({ text: textParts[i], className: "" });
                  }
                }
              }
            });

            parts = newParts;
          });

          return parts.map((part, index) => (
            <span
              key={`highlight-${titleIndex}-${index}`}
              className={part.className}
            >
              {part.text}
            </span>
          ));
        })()}
        {titleIndex < titleParts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Memoize the title rendering
  const renderTitle = useMemo(() => {
    const desktopTitle = mdTitle || title;
    const mobileTitleText = mobileTitle || title;

    return {
      desktop: renderHighlightedTitle(desktopTitle),
      mobile: renderHighlightedTitle(mobileTitleText),
    };
  }, [title, mobileTitle, mdTitle, highlights]);

  // Memoize the description rendering
  const renderDescription = (descText: string): React.ReactNode => {
    return descText.split("<br/>").map((part, index) => (
      <React.Fragment key={`desc-part-${index}`}>
        {part}
        {index < descText.split("<br/>").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const descriptions = useMemo(() => {
    const desktopDesc = description;
    const mobileDesc = mobileDescription || description;

    return {
      desktop: renderDescription(desktopDesc),
      mobile: renderDescription(mobileDesc),
    };
  }, [description, mobileDescription]);

  return (
    <div
      className={`${isMB ? "mb-11" : ""} ${
        mobileAlignmentClasses[effectiveMobileAlignment]
      } ${alignmentClasses[alignment]} ${className}`}
    >
      {/* Desktop Title */}
      {(mdTitle || mobileTitle) && (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={titleVariants}
          className={`hidden md:block text-[26px] md:text-5xl font-normal mb-3 leading-tight ${titleClassName}`}
        >
          {renderTitle.desktop}
        </motion.h2>
      )}

      {/* Mobile Title */}
      {mobileTitle && (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={titleVariants}
          className={`block md:hidden text-[26px] md:text-5xl font-normal mb-3 leading-tight ${titleClassName}`}
        >
          {renderTitle.mobile}
        </motion.h2>
      )}

      {/* Default Title (when no mobile/md variants) */}
      {!mdTitle && !mobileTitle && (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={titleVariants}
          className={`text-[26px] md:text-5xl font-normal mb-3 leading-tight ${titleClassName}`}
        >
          {renderTitle.desktop}
        </motion.h2>
      )}

      {showDescription && description && (
        <>
          {/* Desktop Description */}
          {mobileDescription && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={descriptionVariants}
              className={`hidden md:block text-sm text-secondary md:text-base font-normal ${maxWidth} ${mobileDescriptionAlignmentClasses[effectiveMobileAlignment]} ${descriptionAlignmentClasses[alignment]} leading-relaxed ${descriptionClassName}`}
            >
              {descriptions.desktop}
            </motion.div>
          )}

          {/* Mobile Description */}
          {mobileDescription && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={descriptionVariants}
              className={`block md:hidden text-sm text-secondary md:text-base font-normal ${maxWidth} ${mobileDescriptionAlignmentClasses[effectiveMobileAlignment]} ${descriptionAlignmentClasses[alignment]} leading-relaxed ${descriptionClassName}`}
            >
              {descriptions.mobile}
            </motion.div>
          )}

          {/* Default Description (when no mobile variant) */}
          {!mobileDescription && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={descriptionVariants}
              className={`text-sm text-secondary md:text-base font-normal ${maxWidth} ${mobileDescriptionAlignmentClasses[effectiveMobileAlignment]} ${descriptionAlignmentClasses[alignment]} leading-relaxed ${descriptionClassName}`}
            >
              {descriptions.desktop}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(FlexibleHeading);
