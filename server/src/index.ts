import "./config";
import { ApolloServer, gql } from "apollo-server";
import { abstractedFetch, abstractedPost } from "./abstractedFetch";
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
    lyrics: [Lyric]
  }

  type Mutation {
    addSong(title: String!): Song!
    addLyricIntoSong(songId: Int!, content: String!): Lyric!
  }
`;

const resolvers = {
  Query: {
    songs: () => abstractedFetch("songs"),
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
    addLyricIntoSong: (
      root: {},
      { songId, content }: { songId: number; content: string }
    ) =>
      abstractedPost("lyrics", {
        songId,
        content,
        likes: 0,
      }),
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
