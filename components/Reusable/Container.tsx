interface ContainerProps {
    ref?: any;
    children: React.ReactNode;
    className?: string;
    isHero?: boolean;
    isNavbar?: boolean;
    isFooter?: boolean;
    // NEW: Shorthand to disable all Y-axis spacing
    disableYSpacing?: boolean;
    // NEW: X-axis spacing controls
    disableXSpacingMobile?: boolean;
    disableXSpacingDesktop?: boolean;
    // Padding control
    disablePaddingTopMobile?: boolean;
    disablePaddingTopDesktop?: boolean;
    disablePaddingBottomMobile?: boolean;
    disablePaddingBottomDesktop?: boolean;
    // Margin control
    disableMarginTopMobile?: boolean;
    disableMarginTopDesktop?: boolean;
    disableMarginBottomMobile?: boolean;
    disableMarginBottomDesktop?: boolean;
}

const Container: React.FC<ContainerProps> = ({
    ref,
    children,
    className = "",
    isFooter = false,
    isNavbar = false,
    isHero = false,
    disableYSpacing = false,
    disableXSpacingMobile = false,
    disableXSpacingDesktop = false,
    disablePaddingTopMobile = false,
    disablePaddingTopDesktop = false,
    disablePaddingBottomMobile = false,
    disablePaddingBottomDesktop = false,
    disableMarginTopMobile = false,
    disableMarginTopDesktop = false,
    disableMarginBottomMobile = false,
    disableMarginBottomDesktop = false,
}) => {
    // If disableYSpacing is true, override all Y-axis spacing
    const noPaddingTop = disableYSpacing || disablePaddingTopMobile;
    const noPaddingTopDesktop = disableYSpacing || disablePaddingTopDesktop;
    const noPaddingBottom = disableYSpacing || disablePaddingBottomMobile;
    const noPaddingBottomDesktop = disableYSpacing || disablePaddingBottomDesktop;
    const noMarginTop = disableYSpacing || disableMarginTopMobile;
    const noMarginTopDesktop = disableYSpacing || disableMarginTopDesktop;
    const noMarginBottom = disableYSpacing || disableMarginBottomMobile;
    const noMarginBottomDesktop = disableYSpacing || disableMarginBottomDesktop;

    // Padding
    const paddingTop = isNavbar ? 'pt-0' : !noPaddingTop ? 'pt-32' : '';
    const paddingTopDesktop = isNavbar ? 'lg:pt-0' : !noPaddingTopDesktop ? 'lg:pt-32' : '';
    const paddingBottom = isNavbar ? 'pb-0' : !noPaddingBottom ? 'pb-32' : '';
    const paddingBottomDesktop = isNavbar ? 'lg:pb-0' : !noPaddingBottomDesktop ? 'lg:pb-32' : '';

    // Margin top
    const marginTop = isNavbar
        ? ''
        : !noMarginTop
            ? isHero
                ? 'mt-2'
                : ''
            : '';
    const marginTopDesktop = isNavbar
        ? ''
        : !noMarginTopDesktop
            ? isHero
                ? 'lg:mt-5'
                : ''
            : '';

    // Margin bottom
    const marginBottom = isNavbar
        ? ''
        : !noMarginBottom
            ? isFooter
                ? 'mt-36'
                : ''
            : '';
    const marginBottomDesktop = isNavbar
        ? ''
        : !noMarginBottomDesktop
            ? isFooter
                ? 'lg:mt-36'
                : ''
            : '';

    // Padding left/right (X-axis) - with disable controls
    const getPaddingLR = () => {
        // Mobile padding
        const mobilePadding = disableXSpacingMobile
            ? 'px-0'
            : isHero
                ? 'px-2'
                : 'px-4 md:px-8';

        // Desktop padding
        const desktopPadding = disableXSpacingDesktop
            ? 'lg:px-0'
            : isHero
                ? 'lg:px-7'
                : 'lg:px-10 2xl:px-12';

        return `${mobilePadding} ${desktopPadding}`;
    };

    const paddingLR = getPaddingLR();

    return (
        <div
            ref={ref}
            className={`
                max-w-screen mx-auto 
                ${paddingLR}
                ${paddingTop} ${paddingTopDesktop} ${paddingBottom} ${paddingBottomDesktop}
                ${marginTop} ${marginTopDesktop} ${marginBottom} ${marginBottomDesktop}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Container;