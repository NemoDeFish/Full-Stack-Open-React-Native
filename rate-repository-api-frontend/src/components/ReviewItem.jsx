/* Solution: makes a separate .jsx file for <ReviewItem> component instead of defining it directly in <SingleRepository> because <MyReviews> also uses it */
import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    /* Solution: passes `padding: 15` from <SingleRepository>, which I don't think is necessary */
    padding: 15,
  },
  ratingContainer: {
    flexGrow: 0,
    marginRight: 15,
  },
  /* Solution: applies the styles for the text on a separate <View> container instead of on the text itself */
  ratingCircle: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    /* Solution: since the styles are applied on the container, use 'alignItems' and 'justifyContent' instead of 'textAlign' and 'textAlignVertical' */
    alignItems: "center",
    justifyContent: "center",
  },
  reviewContainer: {
    /* Solution: only uses `flexGrow: 1` and `flexShrink: 1` to wrap the text instead of using my solution, but not sure if it'll work */
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  createdText: {
    marginBottom: 5,
  },
});

const ReviewItem = ({ review, title }) => {
  /* Solution: destructures the review object for usability instead of using 'review.field' */
  const { text, createdAt, rating, user } = review;
  /* Solution: title field is used for <MyReviews> where the title is different, so if title is not specified, it is the username by default */
  const reviewTitle = title ? title : user.username;

  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingCircle}>
          {/* Solution: applies color using styles here, but I think it is unneccessary since you can directly pass the 'color' prop */}
          <Text fontWeight="bold" color="primary" fontSize="subheading">
            {rating}
          </Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {reviewTitle}
        </Text>
        <Text style={styles.createdText} color="textSecondary">
          {format(new Date(createdAt), "dd.MM.yyyy")}
        </Text>
        {/* Solution: checks for text since it is an optional field */}
        {text ? <Text>{text}</Text> : null}
      </View>
    </View>
  );
};

export default ReviewItem;
