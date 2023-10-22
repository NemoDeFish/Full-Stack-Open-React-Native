import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [{ ...style }];

  if (error) {
    textInputStyle[0].borderColor = theme.colors.error;
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
