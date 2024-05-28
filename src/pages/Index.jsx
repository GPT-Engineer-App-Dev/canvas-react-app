import { Box, Container, Flex, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useEvents, useComments, useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error: eventsError, isLoading: eventsLoading } = useEvents();
  const { data: venues, error: venuesError, isLoading: venuesLoading } = useVenues();
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        as="nav"
        bg="blue.500"
        color="white"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          MyApp
        </Text>
        <Box>
          <Link to="/" style={{ margin: "0 10px" }}>
            Home
          </Link>
          <Link to="/about" style={{ margin: "0 10px" }}>
            About
          </Link>
        </Box>
      </Flex>
      <Box
        as="main"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
      >
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        {eventsLoading || venuesLoading ? (
            <Spinner />
          ) : eventsError || venuesError ? (
            <Alert status="error">
              <AlertIcon />
              {eventsError?.message || venuesError?.message}
            </Alert>
          ) : (
            <>
              <Text>Events:</Text>
              {events.map(event => (
                <Box key={event.id}>
                  <Text>{event.name}</Text>
                </Box>
              ))}
              <Text>Venues:</Text>
              {venues.map(venue => (
                <Box key={venue.id}>
                  <Text>{venue.name}</Text>
                </Box>
              ))}
            </>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;