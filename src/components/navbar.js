import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import AddNewPost from "./addNewPost";

const Navbar = () => {
  return (
    <Box>
      <Container>
        <Flex mt={2}>
          <Spacer />
          <AddNewPost />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
