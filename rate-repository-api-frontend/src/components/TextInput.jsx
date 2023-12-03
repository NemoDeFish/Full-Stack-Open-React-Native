import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  /* Solution: declares the styles for <TextInput> inside 'TextInput.jsx' for usability instead of at 'SignIn.jsx' */
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
    /* Solution: set roundness value in theme for frequently used values */
    borderRadius: theme.roundness,
    borderColor: "#aab2bb",
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  /* Solution: uses an array to implement conditional styles instead of an if-statement */
  const textInputStyle = [styles.textInput, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
