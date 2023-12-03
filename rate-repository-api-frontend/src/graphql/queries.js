import { gql } from "@apollo/client";

import {
  REPOSITORY_BASE_FIELDS,
  USER_BASE_FIELDS,
  REVIEW_BASE_FIELDS,
  PAGE_INFO_FIELDS,
} from "./fragments";

/* Solution: give each query a name instead of leaving it blank */
/* Solution: retrieves all the 'repositoryBaseFields' instead of only required fields */
export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      totalCount
      edges {
        node {
          ...repositoryBaseFields
        }
        cursor
      }
      pageInfo {
        ...pageInfoFields
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
  ${PAGE_INFO_FIELDS}
`;

/* Solution: retrieves all the 'userBaseFields' instead of only 'id' and 'username' */
/* Solution: includes 'reviewsFirst' and 'reviewsAfter' as arguments to the query, however, I think this is not necessary as the question did not state infinite scrolling was required for the 'My Reviews' list. So I didn't fetch 'totalCount', 'cursor', and 'pageInfo' */
/* Solution: uses 'userBaseFields' fragment here instead of defining it inside 'reviewBaseFields' fragment */
/* Solution: uses 'repositoryBaseFields' fragment here instead of defining it inside 'reviewBaseFields' fragment, however, I don't think it is necessary since we only need 'fullName' and 'id' */
export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewBaseFields
          }
          user {
            ...userBaseFields
          }
          repository {
            ...repositoryBaseFields
          }
        }
      }
    }
  }

  ${USER_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
`;

/* Solution: 'id', 'fullName', and 'url' is already included in 'repositoryBaseFields' fragment, so do not need to repeat again here */
/* Solution: uses 'userBaseFields' fragment here instead of defining it inside 'reviewBaseFields' fragment */
/* Solution: uses 'repositoryBaseFields' fragment here instead of defining it inside 'reviewBaseFields' fragment, however, I don't think it is necessary since we only need 'fullName' and 'id' */
/* Solution: refactors 'pageInfoFields' into a fragment since it is used in two queries */
export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...repositoryBaseFields
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...reviewBaseFields
            user {
              ...userBaseFields
            }
            repository {
              ...repositoryBaseFields
            }
          }
          cursor
        }
        pageInfo {
          ...pageInfoFields
        }
      }
    }
  }

  ${USER_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
  ${REPOSITORY_BASE_FIELDS}
  ${PAGE_INFO_FIELDS}
`;
