import { useState } from "react";
import { Container, VStack, Text, Input, Button, HStack, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const toast = useToast();

  const addEvent = () => {
    if (newEvent.trim() === "") {
      toast({
        title: "事件名称不能为空",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, { id: Date.now(), name: newEvent }]);
    setNewEvent("");
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">纪念日 APP</Text>
        <HStack width="100%">
          <Input placeholder="输入新的纪念日事件" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} />
          <IconButton aria-label="Add Event" icon={<FaPlus />} onClick={addEvent} />
        </HStack>
        <VStack spacing={2} width="100%">
          {events.map((event) => (
            <HStack key={event.id} width="100%" justifyContent="space-between">
              <Text>{event.name}</Text>
              <IconButton aria-label="Delete Event" icon={<FaTrash />} onClick={() => deleteEvent(event.id)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
