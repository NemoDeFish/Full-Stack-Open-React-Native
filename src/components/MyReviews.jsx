import { View, StyleSheet, FlatList, Alert } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

import Text from "./Text";
import theme from "../theme";
import Button from "./Button";
import useCurrentUser from "../hooks/useCurrentUser";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  reviewContainer: {
    flexDirection: "row",
  },
  ratingContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  reviewInfoContainer: {
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  buttonContainer: {
    paddingTop: 15,
    flexDirection: "row",
  },
  separator: {
    height: 10,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 45,
    height: 45,
    borderRadius: 50 / 2,
    textAlign: "center",
    textAlignVertical: "center",
  },
  createdText: {
    paddingTop: 2,
    paddingBottom: 5,
  },
  buttonLeftContainer: {
    flexGrow: 1,
    paddingRight: 7.5,
  },
  buttonRightContainer: {
    flexGrow: 1,
    paddingLeft: 7.5,
  },
  buttonRight: {
    backgroundColor: theme.colors.error,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const viewRepository = (id) => {
    navigate(`/${id}`);
  };

  const deleteReview = async (deleteReviewId) => {
    await mutate({ variables: { deleteReviewId } });
    refetch({ includeReviews: true });
  };

  const deleteAlert = (deleteReviewId) => {
    Alert.alert("Delete review", "Are you sure you want to delete this review?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteReview(deleteReviewId) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating} fontWeight="bold" color="primary" fontSize="subheading">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewInfoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.repository.fullName}
          </Text>
          <Text style={styles.createdText} color="textSecondary">
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text styles={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonLeftContainer}>
          <Button onPress={() => viewRepository(review.repository.id)}>View repository</Button>
        </View>
        <View style={styles.buttonRightContainer}>
          <Button onPress={() => deleteAlert(review.id)} style={styles.buttonRight}>
            Delete review
          </Button>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { currentUser, refetch } = useCurrentUser({ includeReviews: true });
  const reviews = currentUser ? currentUser.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
