import Constants from "expo-constants";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";

import theme from "../theme";
import Text from "./Text";
import { GET_USER } from "../graphql/queries";
import { useAuthStorage } from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  /* Solution: flexDirection should be implemented for <ScrollView> instead of <View> */
  scrollView: {
    flexDirection: "row",
  },
  tabTouchable: {
    flexGrow: 1,
  },
  /* Solution: wrap <Text> inside of <View> and set the styles as a tabContainer instead of setting the margin for <Text> or <Link> */
  tabContainer: {
    /* Solution: this will make the button pressable along the spaces anywhere inside the container instead of only at the text and setting a fixed height for the <Link> component */
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    /* Solution: center of container vertically and horizontally */
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "white",
  },
});

/* Solution: directly implement AppBarTab component inside the same file as AppBar */
/* Solution: 'props' indicate the 'to' prop, whereas 'children' are the text to display */
const AppBarTab = ({ children, ...props }) => {
  return (
    <Link {...props} style={styles.tabTouchable}>
      <View style={styles.tabContainer}>
        <Text style={styles.tabText} fontWeight="bold">
          {children}
        </Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  const user = data.me;

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        {/* Solution: directly pass the children and props to AppBarTab, instead of creating an array and using the map function */}
        <AppBarTab to="/">Repositories</AppBarTab>
        {!user && <AppBarTab to="/sign-in">Sign in</AppBarTab>}
        {user && (
          <AppBarTab onPress={() => logOut()} to="/sign-out">
            Sign out
          </AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
