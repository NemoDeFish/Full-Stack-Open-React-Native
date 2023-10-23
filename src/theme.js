import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBar: "#24292e",
    mainBackground: "#e1e4e8",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    /* Solution: implements the platform-specific selection in 'theme.js' instead of at 'Main.jsx' because the components use the fontFamily as 'theme.fonts.main'. So to avoid changing all the code which overwrites the font family, we retain 'main' as the main font family and change the selection under 'main' */
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  roundness: 3,
};

export default theme;
