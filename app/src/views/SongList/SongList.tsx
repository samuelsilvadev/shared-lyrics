import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
              <Link to={`/songs/${id}`}>{title}</Link>
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
      <Button as={Link} to="/songs/new" variant="solid" colorScheme="yellow">
        Create new song
      </Button>
    </>
  );
}

export default SongList;
