import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const ItemHeader = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexGrow: 1,
      height: 100,
    },
    avatar: {
      width: 66,
      height: 66,
      borderRadius: 5,
    },
    avatarContainer: {
      flexGrow: 0,
      paddingRight: 15,
    },
    infoContainer: {
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    languageContainer: {
      flexDirection: "row",
    },
    languageText: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      color: "white",
      padding: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText} fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text style={styles.infoText} color="textSecondary">
          {item.description}
        </Text>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemFooter = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    count: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const countSuffix = (number) => {
    if (number > 1000) {
      return (number / 1000).toFixed(1) + "k";
    }
    return number;
  };
  return (
    <View style={styles.container}>
      <View style={styles.count}>
        <Text fontWeight="bold">{countSuffix(item.stargazersCount)}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.count}>
        <Text fontWeight="bold">{countSuffix(item.forksCount)}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.count}>
        <Text fontWeight="bold">{item.reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.count}>
        <Text fontWeight="bold">{item.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 15,
    },
  });

  return (
    <View style={styles.container}>
      <ItemHeader item={item} />
      <ItemFooter item={item} />
    </View>
  );
};

export default RepositoryItem;
