import { useMutation, useApolloClient } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    /* Solution: separates 'payload' and 'data' so they can be used separately, I think my solution is equally viable */
    const payload = await mutate({ variables: { credentials } });
    const { data } = payload;

    /* Solution: checks that data.authenticate is present before setting it in storage */
    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
    }

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
