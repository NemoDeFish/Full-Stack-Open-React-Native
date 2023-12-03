import { gql } from "@apollo/client";

/* Solution: use fragments*/
export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
    ratingAverage
    reviewCount
  }
`;

export const USER_BASE_FIELDS = gql`
  fragment userBaseFields on User {
    id
    username
    createdAt
  }
`;

/* Solution: includes 'userId' and 'repositoryId' */
export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on Review {
    id
    text
    rating
    createdAt
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment pageInfoFields on PageInfo {
    endCursor
    startCursor
    hasPreviousPage
    hasNextPage
  }
`;
