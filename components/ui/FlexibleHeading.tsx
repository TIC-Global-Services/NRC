import React, { useMemo } from "react";
import SlideUpText from "./SlideUpText";

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

  // Function to render highlighted title
  const renderHighlightedTitle = (titleText: string) => {
    if (Object.keys(highlights).length === 0) {
      // No highlights, just handle <br/> tags
      return titleText.split('<br/>').map((part, index) => (
        <React.Fragment key={`title-part-${index}`}>
          {part}
          {index < titleText.split('<br/>').length - 1 && <br />}
        </React.Fragment>
      ));
    }

    // Split title by <br/> tags first
    const titleParts = titleText.split('<br/>');

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
            <span key={`highlight-${titleIndex}-${index}`} className={part.className}>
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
  const renderDescription = (descText: string) => {
    return descText.split('<br/>').map((part, index) => (
      <React.Fragment key={`desc-part-${index}`}>
        {part}
        {index < descText.split('<br/>').length - 1 && <br />}
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

  // Create stable keys for SlideUpText components
  const titleKey = useMemo(() => `title-${title.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`, [title]);
  const descriptionKey = useMemo(() => `desc-${description.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`, [description]);

  return (
    <div
      className={`${isMB ? "mb-11" : ""} ${mobileAlignmentClasses[effectiveMobileAlignment]} ${alignmentClasses[alignment]} ${className}`}
    >
      {/* Desktop Title */}
      {(mdTitle || mobileTitle) && (
        <h2
          className={`hidden md:block text-[26px] md:text-5xl font-normal mb-3 leading-tight ${titleClassName}`}
        >
          <SlideUpText animationMode="once" as="span" key={`${titleKey}-desktop`}>
            {renderTitle.desktop}
          </SlideUpText>
        </h2>
      )}

      {/* Mobile Title */}
      {mobileTitle && (
        <h2
          className={`block md:hidden text-[26px] md:text-5xl font-normal mb-3 leading-tight ${titleClassName}`}
        >
          <SlideUpText animationMode="once" as="span" key={`${titleKey}-mobile`}>
            {renderTitle.mobile}
          </SlideUpText>
        </h2>
      )}

      {/* Default Title (when no mobile/md variants) */}
      {!mdTitle && !mobileTitle && (
        <h2
          className={`text-[26px] md:text-5xl font-normal mb-3 leading-tight ${titleClassName}`}
        >
          <SlideUpText animationMode="once" as="span" key={titleKey}>
            {renderTitle.desktop}
          </SlideUpText>
        </h2>
      )}

      {showDescription && description && (
        <>
          {/* Desktop Description */}
          {(mobileDescription) && (
            <div
              className={`hidden md:block text-sm text-secondary md:text-base font-normal ${maxWidth} ${mobileDescriptionAlignmentClasses[effectiveMobileAlignment]} ${descriptionAlignmentClasses[alignment]} leading-relaxed ${descriptionClassName}`}
            >
              <SlideUpText animationMode="once" delay={0.4} as="span" key={`${descriptionKey}-desktop`}>
                {descriptions.desktop}
              </SlideUpText>
            </div>
          )}

          {/* Mobile Description */}
          {mobileDescription && (
            <div
              className={`block md:hidden text-sm text-secondary md:text-base font-normal ${maxWidth} ${mobileDescriptionAlignmentClasses[effectiveMobileAlignment]} ${descriptionAlignmentClasses[alignment]} leading-relaxed ${descriptionClassName}`}
            >
              <SlideUpText animationMode="once" delay={0.4} as="span" key={`${descriptionKey}-mobile`}>
                {descriptions.mobile}
              </SlideUpText>
            </div>
          )}

          {/* Default Description (when no mobile variant) */}
          {!mobileDescription && (
            <div
              className={`text-sm text-secondary md:text-base font-normal ${maxWidth} ${mobileDescriptionAlignmentClasses[effectiveMobileAlignment]} ${descriptionAlignmentClasses[alignment]} leading-relaxed ${descriptionClassName}`}
            >
              <SlideUpText animationMode="once" delay={0.4} as="span" key={descriptionKey}>
                {descriptions.desktop}
              </SlideUpText>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(FlexibleHeading);