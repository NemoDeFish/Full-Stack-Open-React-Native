import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
/* Solution: combine the two imports instead of separating them */
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";
import Picker from "./Picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 15,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchbar: {
    backgroundColor: "white",
    borderRadius: theme.roundness,
  },
});

/* Solution: uses a separate array to store the options of the picker and passes it to the component, where it will be mapped instead of hardcoding it */
const orderByOptions = [
  { label: "Latest repositories", value: "latest" },
  {
    label: "Highest rated repositories",
    value: "highestRating",
  },
  {
    label: "Lowest rated repositories",
    value: "lowestRating",
  },
];

/* Solution: define a separate object for the query's argument instead of using a switch case for passing the argument to the query. This eliminates the need for a separate 'principle' variable because the query can immediately set the argument using the given 'orderBy' variable and the 'variablesByOrderBy' object */
const variablesByOrderBy = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highestRating: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowestRating: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const RepositoryListHeader = ({ orderBy, onOrderByChange, searchQuery, onSearchKeywordChange }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Solution: adds an additional style for 'searchContainer' */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onSearchKeywordChange}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {/* Solution: refactors <Picker> to be a separate component in 'Picker.jsx' instead of defining it here directly */}
      {/* Solution: we can directly call 'onOrderByChange' as it is already a function call instead of defining a function call here as it was already defined inside <RepositoryList> */}
      <Picker onChange={onOrderByChange} value={orderBy} options={orderByOptions} />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    /* Solution: immediately destructure the props obtained instead of assigning it one by one */
    // this.props contains the component's props
    const { onOrderByChange, orderBy, searchQuery, onSearchKeywordChange } = this.props;

    return (
      <RepositoryListHeader
        orderBy={orderBy}
        onOrderByChange={onOrderByChange}
        searchQuery={searchQuery}
        onSearchKeywordChange={onSearchKeywordChange}
      />
    );
  };

  render() {
    /* Solution: immediately destructure the props obtained instead of assigning it one by one */
    const { repositories, onEndReach, onRepositoryPress } = this.props;

    // Get the nodes from the edges array
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        /* Solution: used to extract a unique key for a given item at the specified index*/
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        /* Solution: should pass a function that renders a component, instead of a function directly*/
        /* Solution: includes `key={item.id}` prop inside <Pressable>, however, I don't think it's necessary as there are no errors */
        renderItem={({ item }) => (
          <Pressable onPress={() => onRepositoryPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        /* Solution: passes 'initialNumToRender' prop to <FlatList>, not sure why and what for since I already pass 'first' argument to the query */
        initialNumToRender={8}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("latest");
  /* Solution: use useState('') instead of useState(undefined) to let react know that it is a string, however, an empty string will be passed to the query, I'm not sure how the query will respond to it? */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    ...variablesByOrderBy[orderBy],
    searchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  /* Solution: we can directly implement 'navigateFunction' here instead of defining it separately since it is a short function */
  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      orderBy={orderBy}
      /* Solution: directly passes a function call instead of a function here instead of implementing it inside <RepositoryListHeader>, however I think that both are fine */
      onOrderByChange={(newOrderBy) => {
        setOrderBy(newOrderBy);
      }}
      searchQuery={searchQuery}
      /* Solution: directly passes a function call instead of a function to <RepositoryListHeader>, however, I think both are fine */
      onSearchKeywordChange={(keyword) => setSearchQuery(keyword)}
      onRepositoryPress={(id) => {
        navigate(`/repositories/${id}`);
      }}
    />
  );
};

export default RepositoryList;
