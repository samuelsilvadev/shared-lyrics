import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query GetAllSongs {
    songs {
      id
      title
    }
  }
`;

export const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;
