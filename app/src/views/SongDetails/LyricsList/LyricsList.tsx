import { useMutation } from "@apollo/client";
import { Badge, Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import ThumbsUp from "../../../components/icons/ThumbsUp";
import type { Lyric } from "../types";
import { LIKE_LYRIC_MUTATION } from "./graphql";

type LyricsListProps = {
  lyrics: Lyric[];
};

function LyricsList({ lyrics }: LyricsListProps) {
  const [like] = useMutation(LIKE_LYRIC_MUTATION);

  const handleOnLike = (id: string) => () => {
    like({
      variables: {
        likeLyricId: id,
      },
    });
  };

  return (
    <Box
      as={UnorderedList}
      w="100%"
      marginBlock="4"
      marginInline="0"
      listStyleType="none"
    >
      {lyrics.map(({ id, content, likes }) => {
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
            {content}
            <Box>
              <Button
                iconSpacing="2"
                p="2"
                h="auto"
                leftIcon={<ThumbsUp />}
                aria-label="Give a thumbs up to the this lyric"
                onClick={handleOnLike(id)}
                border="2px"
              >
                <Badge fontSize="sm" variant="solid" colorScheme="yellow">
                  {likes}
                </Badge>
              </Button>
            </Box>
          </ListItem>
        );
      })}
    </Box>
  );
}

export default LyricsList;
