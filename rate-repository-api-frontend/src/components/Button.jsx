import { Pressable, View, StyleSheet } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  /* Solution: always try and customize the margin, background, padding, etc. inside <View> and limit the <Text> customization to color, size, etc. */
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.roundness,
  },
  text: {
    color: "white",
  },
  colorPrimary: {
    backgroundColor: theme.colors.primary,
  },
  colorError: {
    backgroundColor: theme.colors.error,
  },
  /* Solution: sets `flexGrow: 1` for all the buttons */
  pressable: {
    flexGrow: 1,
  },
});

/* Solution: sets a primary color prop for all buttons so that the component is consistently re-usable */
const Button = ({ children, style, color = "primary", ...props }) => {
  /* Solution: adds conditional styles for the 'color' prop */
  // The objects are merged from left to right so that latter-style properties take precedence
  const buttonStyle = [
    styles.container,
    style,
    color === "primary" && styles.colorPrimary,
    color === "error" && styles.colorError,
  ];

  return (
    <Pressable style={styles.pressable} {...props}>
      <View style={buttonStyle}>
        <Text style={styles.text} fontWeight="bold">
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
