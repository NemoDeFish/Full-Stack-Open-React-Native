/* Solution: refactors <Picker> to be a generic function for usability instead of hardcoding it */
import { Picker as RnPicker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

import theme from "../theme";

/* Solution: applies styles to the picker instead of just using the default */
const styles = StyleSheet.create({
  picker: {
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
  },
});

const Picker = ({ style, value, options = [], onChange }) => {
  const pickerStyle = { ...styles.picker, ...style };

  return (
    <RnPicker style={pickerStyle} selectedValue={value} onValueChange={onChange}>
      {options.map(({ value, label }) => (
        <RnPicker.Item key={value} label={label} value={value} />
      ))}
    </RnPicker>
  );
};

export default Picker;
