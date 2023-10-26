import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import React from "react";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menu: {
    padding: 15,
  },
  searchbar: {
    backgroundColor: "white",
    borderRadius: theme.roundness,
  },
});

const RepositoryListHeader = ({ menu, setMenu, searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.menu}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Picker selectedValue={menu} onValueChange={(itemValue) => setMenu(itemValue)}>
        <Picker.Item value="Latest" label="Latest repositories" />
        <Picker.Item value="Highest" label="Highest rated repositories" />
        <Picker.Item value="Lowest" label="Lowest rated repositories" />
      </Picker>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const menu = props.menu;
    const setMenu = props.setMenu;
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;

    return (
      <RepositoryListHeader
        menu={menu}
        setMenu={setMenu}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  };

  render() {
    const props = this.props;
    const repositories = props.repositories;
    const navigateFunction = props.navigateFunction;
    const onEndReach = props.onEndReach;

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
        renderItem={({ item }) => (
          <Pressable onPress={() => navigateFunction(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [menu, setMenu] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const navigateFunction = (id) => {
    navigate(`/${id}`);
  };

  let principle = {};
  switch (menu) {
    case "Latest":
      principle = { orderBy: "CREATED_AT", orderDirection: "DESC" };
      break;
    case "Highest":
      principle = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "Lowest":
      principle = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
  }

  const { repositories, fetchMore } = useRepositories({ first: 8, ...principle, searchKeyword });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      menu={menu}
      setMenu={setMenu}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      navigateFunction={navigateFunction}
    />
  );
};

export default RepositoryList;
