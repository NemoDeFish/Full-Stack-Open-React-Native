import { View, Image, StyleSheet } from "react-native";

import Text from "./Text";
import theme from "../theme";
import formatInThousands from "../utils/formatInThousands";

/* Solution: declare the styles for all components once inside a file globally instead of inside individual components */
const styles = StyleSheet.create({
  /* Solution: group all containers together first */
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    /* Solution: try and use 'margin' and 'padding' instead of using fixed 'height' or 'width' */
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatarContainer: {
    flexGrow: 0,
    /* Solution: use 'margin' for anything outside the container instead of 'padding' */
    marginRight: 20,
  },
  contentContainer: {
    /* Solution: no need to declare another new flex container with 'flexDirection': "column" because the elements are already in separate rows */
    /* Solution: there is already a flex container 'topContainer' */
    flexGrow: 1,
    flexShrink: 1,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  /* Solution :sets marginBottom and marginTop of text individually instead of using justifyContent: "space-evenly" */
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  languageText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    /* Solution: set roundness value in theme for frequently used values */
    borderRadius: theme.roundness,
    /* Solution: set 'flexGrow' for 'flexDirection' items*/
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  countItem: {
    /* Solution: since 'bottomContainer' has a 'flexDirection', 'countItem' should have 'flexGrow' */
    flexGrow: 0,
    /* Solution: no need to delcare another flex container 'column' since the elements are already in separate rows */
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
});

const RepositoryItemTop = ({ item }) => {
  /* Solution: destructures 'item' object into variables to avoid using dot notation */
  const { fullName, description, language, ownerAvatarUrl } = item;

  return (
    <View style={styles.topContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={styles.nameText}
          fontWeight="bold"
          fontSize="subheading"
          /* Solution: ensure no truncated text*/
          numberOfLines={1}
        >
          {fullName}
        </Text>
        <Text style={styles.descriptionText} color="textSecondary">
          {description}
        </Text>
        {/* Solution: checks for the presence of language */}
        {language ? (
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{language}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

/* Solution: repetitive code for displaying count item should be refactored into own component */
const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold">
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItemBottom = ({ item }) => {
  const { forksCount, stargazersCount, ratingAverage, reviewCount } = item;

  return (
    <View style={styles.bottomContainer}>
      <CountItem count={stargazersCount} label="Stars" />
      <CountItem count={forksCount} label="Forks" />
      <CountItem count={reviewCount} label="Reviews" />
      <CountItem count={ratingAverage} label="Rating" />
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      {/* Solution: immediately implements containers here using <View> instead of separating into components */}
      <RepositoryItemTop item={item} />
      <RepositoryItemBottom item={item} />
    </View>
  );
};

export default RepositoryItem;
