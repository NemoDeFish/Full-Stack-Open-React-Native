import { gql } from "@apollo/client";

import { USER_BASE_FIELDS } from "./fragments";

/* Solution: also includes the user's fields instead of just the accessToken only */
export const AUTHENTICATE = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...userBaseFields
      }
    }
  }

  ${USER_BASE_FIELDS}
`;

/* Solution returns '...reviewBaseFields' and 'repositoryBaseFields', however I don't think this is necessary */
export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

/* Solution returns '...userBaseFields' instead of just 'id', however I don't think this is necessary */
export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
