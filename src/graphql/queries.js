import { gql } from "@apollo/client";

import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS, REVIEW_BASE_FIELDS } from "./fragments";

/* Solution: retrieves all the 'repositoryBaseFields' instead of only required fields */
export const GET_REPOSITORIES = gql`
  query (
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
      edges {
        node {
          ...repositoryBaseFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

/* Solution: retrieves all the 'userBaseFields' instead of only 'id' and 'username' */
export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewBaseFields
          }
        }
      }
    }
  }

  ${USER_BASE_FIELDS}
  ${REVIEW_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      ...repositoryBaseFields
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...reviewBaseFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }

  ${REVIEW_BASE_FIELDS}
  ${REPOSITORY_BASE_FIELDS}
`;
