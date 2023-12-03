import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, StyleSheet, FlatList } from "react-native";

import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  /* Solution: implements the button in <RepositoryItem> by passing a 'showGithubLink' prop, instead of implementing it here so they are one component together and we do not have to redefine 'backgroundColor' and 'padding' */
  return (
    <>
      <RepositoryItem item={repository} showGithubLink />
      {/* Solution: use <ItemSeparator> instead of styling `marginBottom: 10` */}
      <ItemSeparator />
    </>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { first: 3, id };

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  /* Solution: assigns 'data.repository' to a variable for reusability and also checks it */
  const repository = data?.repository;

  const onEndReach = () => {
    const canFetchMore = !loading && repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  /* Solution: maps 'reviewNodes' instead of directly inside when passing props, however I don't think it's neccessary */
  const reviewNodes = repository ? repository.reviews.edges.map(({ node }) => node) : [];

  /* Solution: immediately returns instead of checking for presence of data here before returning because it returns an empty array if data is not present in reviewNodes */
  /* Solution: also checks for 'repository' inside 'ListHeaderComponent' before returning <RepositoryInfo>, however, I think it's so troublesome to check multiple times, instead I can just check once before returning and just return null for everything otherwise */
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (repository ? <RepositoryInfo repository={repository} /> : null)}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
