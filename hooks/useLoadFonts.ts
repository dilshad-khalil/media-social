import { useFonts } from "expo-font";

const useLoadFonts = () => {
  const [fontsLoaded, error] = useFonts({
    SF_Pro_UltraLight: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Ultralight.otf"),
    SF_Pro_Thin: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Thin.otf"),
    SF_Pro_Light: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Light.otf"),
    SF_Pro_Regular: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Regular.otf"),
    SF_Pro_Medium: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Medium.otf"),
    SF_Pro_Semibold: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Semibold.otf"),
    SF_Pro_Bold: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Bold.otf"),
    SF_Pro_Black: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Black.otf"),
    SF_Pro_Heavy: require("../assets/fonts/sf-pro-display/SF-Pro-Display-Heavy.otf"),
  });
  if (error) {
    console.error("Error loading fonts:", error);
  }
  return [fontsLoaded, error];
};

export default useLoadFonts;
