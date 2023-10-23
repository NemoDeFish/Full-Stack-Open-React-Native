import { FlatList, View, StyleSheet } from "react-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      /* Solution: used to extract a unique key for a given item at the specified index*/
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      /* Solution: should pass a function that renders a component, instead of a function directly*/
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
