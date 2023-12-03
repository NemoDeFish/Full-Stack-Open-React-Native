import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

import ReviewItem from "./ReviewItem";
import Button from "./Button";
import useCurrentUser from "../hooks/useCurrentUser";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  reviewItemWrapper: {
    backgroundColor: "white",
    padding: 15,
  },
  actionsContainer: {
    /* Solution: use 'marginTop' instead of 'paddingTop' for space outside the container */
    marginTop: 15,
    flexDirection: "row",
  },
  separator: {
    height: 10,
  },
  actionButton: {
    flexGrow: 1,
    marginRight: 15,
  },
  lastActionButton: {
    marginRight: 0,
  },
});

const DeleteReviewButton = ({ onPress, ...props }) => {
  /* Solution: factorize the alert buttons into a separate array instead hardcoding it inside the alert function */
  const alertButtons = [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Delete",
      onPress: () => onPress(),
    },
  ];

  const deleteWithConfirmation = () => {
    Alert.alert("Delete review", "Are you sure you want to delete this review?", alertButtons, {
      /* Solution: has a cancelable prop, not sure what it is for, it worked without the prop too */
      cancelable: false,
    });
  };

  return (
    /* Solution: pass the color attribute here instead of defining it in styles. The <Button> is also modified to handle this */
    <Button onPress={deleteWithConfirmation} color="error" {...props}>
      Delete review
    </Button>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItemWithActions = ({ review, onDelete }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.reviewItemWrapper}>
      {/* Solution: uses the title field to change the title of the review item so that <ReviewItem> component can be re-used, but with a different title, instead of defining the entire <ReviewItem> component here again,  */}
      <ReviewItem review={review} title={review.repository.fullName} />
      <View style={styles.actionsContainer}>
        {/* Solution: directly call the navigate function in the 'onPress' prop instead of defining a separate function */}
        <Button
          style={styles.actionButton}
          onPress={() => navigate(`/repositories/${review.repository.id}`)}
        >
          View repository
        </Button>
        {/* Solution: 'onDelete' function is passed directly instead of a function call because a function call has already been defined when passing from <MyReviews> */}
        {/* Solution: refactors the Alert as well as the delete button into a separate component <DeleteReviewButton /> */}
        {/* Solution: styles the buttons by applying styles.actionButton to both buttons, which means that both have a right margin of 15 and a flexGrow of 1, however, for the last button, it removes the right margin. This makes it more flexible for adding multiple buttons and easier to manage instead of hardcoding one container for each button and setting the right and left margins for the respective containers */}
        <DeleteReviewButton
          onPress={onDelete}
          style={[styles.actionButton, styles.lastActionButton]}
        />
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { currentUser, refetch } = useCurrentUser({ includeReviews: true });

  /* Solution: implements the mutation and the 'onDelete' function in <MyReviews> instead of <ReviewItem>, however, the functions are only used inside <ReviewItem>, maybe it is a better practice to define it inside a higher-level component? */
  const [deleteReview] = useMutation(DELETE_REVIEW);
  /* Solution: checks for currentUser and also the reviews.edges using a nullish coalescing operator, if it is null, the empty array is returned, instead of using a '? :' conditional operator */
  const reviewEdges = currentUser?.reviews.edges ?? [];
  /* Solution: also separates the 'reviewEdges' with the mapping to 'reviewNodes', not sure why? */
  const reviewNodes = reviewEdges.map(({ node }) => node);

  const onDelete = async (id) => {
    await deleteReview({ variables: { id } });
    refetch();
  };

  return (
    <FlatList
      data={reviewNodes}
      /* Solution: passes onDelete function as a function call instead of a function only because 'onPress' function afterwards require a function call, so it can directly be passed a function there now */
      renderItem={({ item }) => (
        /* Solution: we can pass the props to the 'onDelete' function here directly instead of passing it in 'deleteWithConfirmation' function above since we already have the item ID */
        <ReviewItemWithActions review={item} onDelete={() => onDelete(item.id)} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
