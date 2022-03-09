import { gql, useQuery } from "@apollo/client";
import { Button, Heading } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

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
  song: {
    id: string;
    title: string;
    lyrics: {
      id: string;
      content: string;
      likes: number;
    }[];
  } | null;
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
    </>
  );
}

export default SongDetails;
