import "./config";
import { ApolloServer, gql } from "apollo-server";
import {
  abstractedDelete,
  abstractedFetch,
  abstractedPost,
} from "./abstractedFetch";
import type { Lyric, Song } from "./types";

const typeDefs = gql`
  type Song {
    id: ID
    title: String
    lyrics: [Lyric]
  }

  type Lyric {
    id: ID
    likes: Int
    content: String
    song: Song
  }

  type Query {
    songs: [Song]
    song(id: ID!): Song
    lyrics: [Lyric]
  }

  type Mutation {
    addSong(title: String!): Song!
    deleteSong(id: ID!): Song!
    addLyricIntoSong(songId: ID!, content: String!): Song!
  }
`;

const resolvers = {
  Query: {
    songs: () => abstractedFetch("songs"),
    song: (root: {}, { id }: { id: string }) => abstractedFetch(`songs/${id}`),
    lyrics: () => abstractedFetch("lyrics"),
  },
  Song: {
    lyrics: (song: Song) => abstractedFetch(`songs/${song.id}/lyrics`),
  },
  Lyric: {
    song: (lyric: Lyric) => abstractedFetch(`songs/${lyric.songId}`),
  },
  Mutation: {
    addSong: (root: {}, { title }: { title: string }) =>
      abstractedPost("songs", {
        title,
      }),
    deleteSong: (root: {}, { id }: { id: string }) =>
      abstractedDelete("songs", id).then(() => ({
        id,
      })),
    addLyricIntoSong: (
      root: {},
      { songId, content }: { songId: number; content: string }
    ) => {
      return Promise.all([
        abstractedPost("lyrics", {
          songId,
          content,
          likes: 0,
        }),
        abstractedFetch(`songs/${songId}`),
      ]).then(([lyric, song]) => song);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
