import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 80,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

const AppBar = () => {
  const tabs = [
    { text: "Repositories", route: "/" },
    { text: "Sign in", route: "/signin" },
  ];
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {tabs.map((tab) => (
          <AppBarTab key={tab.text} style={styles.flexItem} tab={tab} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
