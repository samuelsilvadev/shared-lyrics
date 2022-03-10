import { gql, useQuery } from "@apollo/client";
import { Button, Heading } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import CreateLyric from "./CreateLyric";
import LyricsList from "./LyricsList";
import type { Song } from "./types";

const GET_SONG = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

type GetSongQueryResponse = {
  song: Song | null;
};

function SongDetails() {
  const { id: songId } = useParams<{ id: string }>();
  const { loading, data } = useQuery<GetSongQueryResponse>(GET_SONG, {
    variables: {
      id: songId,
    },
  });

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Button
        as={Link}
        to="/"
        variant="link"
        colorScheme="yellow"
        marginBlockStart="4"
      >
        Back
      </Button>
      <Heading as="h1" marginBlockStart="4">
        {data?.song?.title}
      </Heading>
      {data?.song?.lyrics && <LyricsList lyrics={data.song.lyrics} />}
      <CreateLyric songId={songId} />
    </>
  );
}

export default SongDetails;
