import { FormEventHandler, useState } from "react";
import { Button, FormLabel, Input, Box, Heading } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

const SAVE_SONG_MUTATION = gql`
  mutation SaveSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

type SaveSongsMutationResponse = {
  addSong: { title: string; id: string };
};

function NewSong() {
  const [saveSong] = useMutation<SaveSongsMutationResponse>(SAVE_SONG_MUTATION);
  const [songTitle, setSongTitle] = useState("");

  const handleOnSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    saveSong({
      variables: {
        title: songTitle,
      },
    });
  };

  return (
    <>
      <Heading as="h1" marginBlockStart="4" marginInline="4">
        Create a new song
      </Heading>
      <Box as="form" p="4" onSubmit={handleOnSubmit}>
        <FormLabel htmlFor="song-name">Song title:</FormLabel>
        <Input
          id="song-name"
          type="text"
          value={songTitle}
          onChange={({ target: { value } }) => setSongTitle(value)}
          marginBlockEnd="2"
        />
        <Button variant="solid" colorScheme="yellow" type="submit">
          Save
        </Button>
      </Box>
    </>
  );
}

export default NewSong;
