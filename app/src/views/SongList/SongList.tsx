import { gql, useQuery } from "@apollo/client";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

const GET_SONGS_QUERY = gql`
  query GetAllSongs {
    songs {
      id
      title
    }
  }
`;

type GetSongsQueryResponse = {
  songs: { title: string; id: string }[];
};

function SongList() {
  const { data, loading } = useQuery<GetSongsQueryResponse>(GET_SONGS_QUERY);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <Box as={UnorderedList} w="100%" p={4} m="0" listStyleType="none">
      {data?.songs.map(({ id, title }) => {
        return (
          <ListItem
            border="1px"
            padding="5"
            sx={{
              "&:not(:last-child)": {
                marginBlockEnd: "2",
              },
            }}
            key={id}
          >
            {title}
          </ListItem>
        );
      })}
    </Box>
  );
}

export default SongList;
