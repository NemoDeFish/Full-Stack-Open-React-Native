import { useQuery } from "@apollo/client";

import { GET_USER } from "../graphql/queries";

const useUser = () => {
  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return { user: null };
  }

  return { user: data.me };
};

export default useUser;
