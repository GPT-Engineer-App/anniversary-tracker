import { Box, Heading, Button, Input, VStack } from "@chakra-ui/react";

function MyPage() {
  return (
    <Box p={4}>
      <Heading mb={4}>My Page</Heading>
      <VStack spacing={4}>
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
        <Button colorScheme="teal">Login</Button>
        <Button colorScheme="teal" variant="outline">
          Register
        </Button>
      </VStack>
    </Box>
  );
}

export default MyPage;
