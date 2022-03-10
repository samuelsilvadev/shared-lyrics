import { gql } from "@apollo/client";

export const LIKE_LYRIC_MUTATION = gql`
  mutation LikeLyric($likeLyricId: ID!) {
    likeLyric(id: $likeLyricId) {
      id
      likes
    }
  }
`;
