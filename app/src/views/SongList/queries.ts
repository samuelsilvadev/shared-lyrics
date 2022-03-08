import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GetAllSongs {
    songs {
      id
      title
    }
  }
`;
