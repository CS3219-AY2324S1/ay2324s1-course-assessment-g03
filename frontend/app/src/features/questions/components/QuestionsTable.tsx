import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  HStack,
  IconButton,
  TableContainer,
  Td,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useDeleteQuestion } from "../api/useDeleteQuestion";
import { useUpdateQuestion } from "../api/useUpdateQuestion";
import { useQuestions } from "../api/useQuestions";
import { Question } from "@/types/question";
import { useCreateQuestion } from "../api/useCreateQuestion";
import { PiPencilBold, PiTrashBold } from "react-icons/pi";

const columnHelper = createColumnHelper<Question>();

const QuestionsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currQuestion, setCurrQuestion] = useState<Question>();
  const { data } = useQuestions();
  const deleteQuestion = useDeleteQuestion();
  const updateQuestion = useUpdateQuestion();
  const createQuestion = useCreateQuestion();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: info => <Text>{info.getValue()}</Text>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor("title", {
        cell: info => <Text>{info.getValue()}</Text>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor("category", {
        cell: info => <Text>{info.getValue()}</Text>,
        footer: info => info.column.id,
      }),
      columnHelper.accessor("difficulty", {
        cell: info => (
          <Text
            color={
              info.getValue() === "Easy"
                ? "green.700"
                : info.getValue() === "Medium"
                ? "yellow.700"
                : "red.700"
            }
            fontWeight="500"
          >
            {info.getValue()}
          </Text>
        ),
        footer: info => info.column.id,
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <HStack>
            <IconButton
              aria-label="Edit Question"
              icon={<PiPencilBold />}
              bg="dark.500"
              color="light.500"
              _hover={{
                background: "dark.500",
                color: "light.300",
              }}
              onClick={() => {
                setCurrQuestion(row.original);
                onOpen();
              }}
            />
            <IconButton
              aria-label="Delete Question"
              icon={<PiTrashBold />}
              bg="dark.500"
              color="light.500"
              _hover={{
                background: "dark.500",
                color: "light.300",
              }}
              onClick={() =>
                deleteQuestion.mutate({ questionId: row.original.id })
              }
            />
          </HStack>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: data ? data.data.questions : [],
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSave = (question: Question | undefined) => {
    if (question) {
      if (currQuestion) {
        updateQuestion.mutate(question);
      } else {
        createQuestion.mutate(question);
      }
    }
    onClose();
  };

  return (
    <>
      <Button
        onClick={() => {
          setCurrQuestion(undefined);
          onOpen();
        }}
      >
        Add Question
      </Button>
      <TableContainer border="1px" borderColor="light.700" borderRadius="md">
        <Table variant="unstyled">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr
                key={row.id}
                borderTop="1px"
                borderColor="light.700"
                borderRadius="md"
              >
                {row.getVisibleCells().map(cell => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currQuestion ? "Edit" : "Create"} Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Question Title</FormLabel>
              <Input
                defaultValue={currQuestion ? currQuestion.title : ""}
                onChange={e =>
                  setCurrQuestion(
                    currQuestion
                      ? {
                          ...currQuestion,
                          title: e.target.value,
                        }
                      : currQuestion,
                  )
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleSave(currQuestion)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionsTable;
