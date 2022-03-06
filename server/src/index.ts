import "./config";
import { ApolloServer, gql } from "apollo-server";
import { abstractedFetch } from "./abstractedFetch";

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
`;

const resolvers = {
  Query: {
    songs: () => abstractedFetch("songs"),
    lyrics: () => abstractedFetch("lyrics"),
  },
  Song: {
    lyrics: (song: { id: string }) =>
      abstractedFetch(`songs/${song.id}/lyrics`),
  },
  Lyric: {
    song: (lyric: { id: string; songId: string }) =>
      abstractedFetch(`songs/${lyric.songId}`),
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
