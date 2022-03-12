import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { DELETE_SONG, GET_SONGS } from "./graphql";

type GetSongsQueryResponse = {
  songs: { title: string; id: string }[];
};

type DeleteSongsMutationResponse = {
  deleteSong: { id: string };
};

function SongList() {
  const {
    data,
    loading,
    refetch: refetchSongs,
  } = useQuery<GetSongsQueryResponse>(GET_SONGS);
  const [deleteSong] = useMutation<DeleteSongsMutationResponse>(DELETE_SONG);

  if (loading) {
    return <>Loading...</>;
  }

  const handleOnDeleteSong = (id: string) => () => {
    deleteSong({
      variables: {
        id,
      },
    }).then(refetchSongs);
  };

  return (
    <>
      <Heading as="h1" marginBlockStart="4">
        List of available songs
      </Heading>
      <Box
        as={UnorderedList}
        w="100%"
        marginBlock="4"
        marginInline="0"
        listStyleType="none"
      >
        {data?.songs.map(({ id, title }) => {
          return (
            <ListItem
              border="2px"
              padding="5"
              sx={{
                "&:not(:last-child)": {
                  marginBlockEnd: "2",
                },
              }}
              key={id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link
                textDecoration="underline"
                as={RouterLink}
                to={`/songs/${id}`}
              >
                {title}
              </Link>
              <Button
                variant="solid"
                colorScheme="yellow"
                onClick={handleOnDeleteSong(id)}
              >
                delete me
              </Button>
            </ListItem>
          );
        })}
      </Box>
      <Button
        as={RouterLink}
        to="/songs/new"
        variant="solid"
        colorScheme="yellow"
      >
        Create new song
      </Button>
    </>
  );
}

export default SongList;
