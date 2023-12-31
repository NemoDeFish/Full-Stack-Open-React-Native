import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        {/* Solution: define the single repository path as "repositories/:id" instead of just ":id" */}
        <Route path="repositories/:id" element={<SingleRepository />} exact />
        {/* Solution: try and follow the name of the component when defining route's path */}
        <Route path="create-review" element={<CreateReview />} exact />
        <Route path="sign-up" element={<SignUp />} exact />
        <Route path="my-reviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
