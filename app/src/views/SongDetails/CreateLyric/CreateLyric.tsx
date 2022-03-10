import { gql, useMutation } from "@apollo/client";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import { Song } from "../types";

const SAVE_LYRIC_MUTATION = gql`
  mutation AddLyricIntoSong($songId: ID!, $content: String!) {
    addLyricIntoSong(songId: $songId, content: $content) {
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

type SaveLyricMutationResponse = {
  addLyricIntoSong: Song;
};

type CreateLyricProps = {
  songId: string;
};

function CreateLyric({ songId }: CreateLyricProps) {
  const [saveLyric] =
    useMutation<SaveLyricMutationResponse>(SAVE_LYRIC_MUTATION);
  const [lyric, setLyric] = useState("");

  const handleOnSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    saveLyric({
      variables: {
        songId,
        content: lyric,
      },
    }).then(() => {
      setLyric("");
    });
  };

  return (
    <Box as="form" marginBlockStart="4" onSubmit={handleOnSubmit}>
      <FormLabel htmlFor="song-name">Add a new lyric:</FormLabel>
      <Input
        id="song-name"
        type="text"
        value={lyric}
        onChange={({ target: { value } }) => setLyric(value)}
        marginBlockEnd="2"
        required
      />
      <Button variant="solid" colorScheme="yellow" type="submit">
        Save
      </Button>
    </Box>
  );
}

export default CreateLyric;
