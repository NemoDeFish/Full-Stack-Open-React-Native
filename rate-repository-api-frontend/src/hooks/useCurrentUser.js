import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

/* Solution: does not set the default value of 'includeReviews' as undefined, maybe it is undefined by default? */
const useCurrentUser = (includeReviews) => {
  /* Solution: receives all the remaining files as ...rest, instead of only receiving the 'refetch' field */
  const { data, ...rest } = useQuery(GET_CURRENT_USER, {
    variables: includeReviews,
    fetchPolicy: "cache-and-network",
  });
  /* Solution: places a '?' in front of data instead of using `if (loading)` */
  return { currentUser: data?.me, ...rest };
};

export default useCurrentUser;
