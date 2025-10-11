// useDevice.ts
import { useMemo } from "react";
import {
  isMobile,
  isTablet,
  isBrowser,
  isAndroid,
  isIOS,
} from "react-device-detect";

export function useDevice() {
  return useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop: isBrowser,
      isAndroid,
      isIOS,
    }),
    []
  );
}
