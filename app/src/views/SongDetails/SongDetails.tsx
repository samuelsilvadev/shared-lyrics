import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SongDetails() {
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
        Song Details
      </Heading>
    </>
  );
}

export default SongDetails;
