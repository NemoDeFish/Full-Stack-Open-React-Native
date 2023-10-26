import * as Linking from "expo-linking";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, StyleSheet, FlatList } from "react-native";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import Button from "./Button";
import Text from "./Text";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
  },
  ratingContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  reviewContainer: {
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  buttonContainer: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: "white",
    marginBottom: 10,
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
});

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return (
    <>
      <RepositoryItem item={repository} />
      <View style={styles.buttonContainer}>
        <Button onPress={() => Linking.openURL(repository.url)}>Open in GitHub</Button>
      </View>
    </>
  );
};

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} fontWeight="bold" color="primary" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.user.username}
        </Text>
        <Text style={styles.createdText} color="textSecondary">
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text styles={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { first: 8, id };
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const onEndReach = () => {
    console.log("END");
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (data) {
    return (
      <FlatList
        data={data.repository.reviews.edges.map((edge) => edge.node)}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
};

export default SingleRepository;
