import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import type { Lyric } from "../types";

type LyricsListProps = {
  lyrics: Lyric[];
};

function LyricsList({ lyrics }: LyricsListProps) {
  return (
    <Box
      as={UnorderedList}
      w="100%"
      marginBlock="4"
      marginInline="0"
      listStyleType="none"
    >
      {lyrics.map(({ id, content }) => {
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
          </ListItem>
        );
      })}
    </Box>
  );
}

export default LyricsList;
