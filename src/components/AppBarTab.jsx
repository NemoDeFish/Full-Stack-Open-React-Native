import { StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  button: {
    margin: 15,
  },
});

const AppBarTab = ({ tab }) => {
  return (
    <Link to={tab.route} style={styles.button}>
      <Text
        style={styles.text}
        color="textPrimary"
        fontWeight="bold"
        fontSize="subheading"
      >
        {tab.text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
