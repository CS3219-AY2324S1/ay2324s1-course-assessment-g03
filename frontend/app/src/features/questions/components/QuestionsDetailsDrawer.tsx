import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Box,
} from "@chakra-ui/react";
import { useQuestions } from "../providers/QuestionsProvider";

const format = (data: Object) => {
  return Object.entries(data).map(([key, value]) => {
    if (Array.isArray(value)) {
      return;
    } else {
      return (
        <Box key={key} mb={2}>
          <Text fontWeight="medium">{key}</Text>
          <Text color="dark.300">{value}</Text>
        </Box>
      );
    }
  });
};

const QuestionsDetailsDrawer = () => {
  const { currQuestion, isDetailsDrawerOpen, onDetailsDrawerClose, btnRef } =
    useQuestions();

  return (
    <Drawer
      isOpen={isDetailsDrawerOpen}
      placement="right"
      onClose={onDetailsDrawerClose}
      finalFocusRef={btnRef}
      size="xl"
    >
      <DrawerOverlay />
      <DrawerContent
        bg="dark.950"
        border="1px"
        borderColor="dark.800"
        borderRadius="md"
      >
        <DrawerCloseButton color="dark.300" _hover={{ color: "dark.100" }} />
        <DrawerHeader fontSize="lg" color="dark.100">
          Question Details
        </DrawerHeader>
        {currQuestion && (
          <DrawerBody alignItems="start" display="flex" flexDirection="column">
            {format(currQuestion)}
          </DrawerBody>
        )}
        <DrawerFooter>
          <Button variant="outline" onClick={onDetailsDrawerClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default QuestionsDetailsDrawer;
