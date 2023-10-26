import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (includeReviews = undefined) => {
  /* Solution: does not import loading field or use a fetchPolicy */
  const { data, refetch } = useQuery(GET_CURRENT_USER, { variables: includeReviews });
  /* Solution: places a '?' in front of data instead of using `if (loading)` */
  return { currentUser: data?.me, refetch };
};

export default useCurrentUser;
