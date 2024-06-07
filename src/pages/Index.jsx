import { useState, useEffect } from "react";
import { Container, VStack, Text, Input, Button, HStack, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "" });
  const [reminder, setReminder] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (reminder) {
      const timer = setTimeout(() => {
        toast({
          title: `Reminder: ${reminder.name} is coming up!`,
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        setReminder(null);
      }, reminder.time);
      return () => clearTimeout(timer);
    }
  }, [reminder, toast]);

  const addEvent = () => {
    if (newEvent.name.trim() === "") {
      toast({
        title: "事件名称不能为空",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const eventDate = new Date(newEvent.date);
    const now = new Date();
    const timeSinceEvent = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));

    setEvents([...events, { id: Date.now(), name: newEvent.name, date: newEvent.date, daysSince: timeSinceEvent }]);
    setNewEvent({ name: "", date: "" });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">纪念日 APP</Text>
        <HStack width="100%">
          <Input placeholder="输入新的纪念日事件" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <IconButton aria-label="Add Event" icon={<FaPlus />} onClick={addEvent} />
        </HStack>
        <VStack spacing={2} width="100%">
          {events.map((event) => (
            <HStack key={event.id} width="100%" justifyContent="space-between">
              <Text>
                {event.name} - {new Date(event.date).toLocaleDateString()} ({event.daysSince} 天前)
              </Text>
              <IconButton aria-label="Delete Event" icon={<FaTrash />} onClick={() => deleteEvent(event.id)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
