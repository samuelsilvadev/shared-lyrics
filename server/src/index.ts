import "./config";
import { ApolloServer, gql } from "apollo-server";
import { abstractedFetch } from "./abstractedFetch";
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
    addSong: (root: {}, { title }: { title: string }) => {
      return abstractedFetch("songs", {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
