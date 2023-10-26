import Constants from "expo-constants";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

import theme from "../theme";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import useCurrentUser from "../hooks/useCurrentUser";

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
const AppBarTab = ({ children, to, ...props }) => {
  const content = (
    /* Solution: passes props directly to <View> instead of to <Link> */
    <View style={styles.tabContainer} {...props}>
      <Text style={styles.tabText} fontWeight="bold">
        {children}
      </Text>
    </View>
  );

  /* Solution: wraps the text in <Pressable> if it is only a function instead of a router, otherwise, wrap it in a <Link> as usual. This prevents the 'onSubmit' prop from being passsed to <Link> and the 'to' prop from being passed to <Pressable>. However, I think that this is unnecessary and my solution showed that passing the 'onSubmit' prop to <Link> without using <Pressable> achieves the same result and retains the Tab style when pressed */
  return to ? (
    <Link to={to} {...props} style={styles.tabTouchable}>
      {content}
    </Link>
  ) : (
    <Pressable {...props}>{content}</Pressable>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser({ includeReviews: true });

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    /* Solution: navigates back to home after sign out */
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        {/* Solution: directly pass the children and props to AppBarTab, instead of creating an array and using the map function */}
        <AppBarTab to="/">Repositories</AppBarTab>
        {/* Solution: uses `? :` conditional rendering instead of `&&`, a little cleaner as you only need to state the condition once */}
        {/* Solution: passing the function directly and passing a function that calls the function handler is the same */}
        {currentUser ? (
          <>
            <AppBarTab to="/create">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My reviews</AppBarTab>
            <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/sign-in">Sign in</AppBarTab>
            <AppBarTab to="/sign-up">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
