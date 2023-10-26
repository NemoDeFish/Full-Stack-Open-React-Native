import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  /* Solution: uses a function to get the key and use the function in the remaining methods to eliminate hardcoding and repeating `${this.namespace}:accessToken` for each methods */
  getKey(key) {
    return `${this.namespace}:${key}`;
  }

  /* Solution removes 'async' & 'await' */
  /* Solution: returns the 'AsyncStorage' methods instead of returning the obtained values*/
  getAccessToken() {
    // Get the access token for the storage
    /* Solution: removes 'JSON.parse' */
    return AsyncStorage.getItem(this.getKey("accessToken"));
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    /* Solution: removes 'JSON.stringify' */
    return AsyncStorage.setItem(this.getKey("accessToken"), accessToken);
  }

  removeAccessToken() {
    // Remove the access token from the storage
    return AsyncStorage.removeItem(this.getKey("accessToken"));
  }
}

export default AuthStorage;
