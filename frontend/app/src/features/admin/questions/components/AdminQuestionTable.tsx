import { Dispatch, SetStateAction, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  HStack,
  IconButton,
  TableContainer,
  Td,
  Text,
} from "@chakra-ui/react";
import { useDeleteQuestion } from "../api/useDeleteQuestion";
import { useUpdateQuestion } from "../api/useUpdateQuestion";
import { Question } from "@/types/question";
import { useCreateQuestion } from "../api/useCreateQuestion";
import { PiPencilBold, PiTrashBold } from "react-icons/pi";
import AdminQuestionModal from "./AdminQuestionModal";

const columnHelper = createColumnHelper<Question>();

const getHeaderNode = (text: string) => () => (
  <Text
    casing="none"
    color="dark.300"
    fontWeight="semibold"
    fontSize="sm"
    py="4"
    letterSpacing="normal"
  >
    {text}
  </Text>
);

interface AdminQuestionTableProps {
  questions: Question[];
  pageCount: number;
  currQuestion: Question | undefined;
  setCurrQuestion: Dispatch<SetStateAction<Question | undefined>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AdminQuestionTable = ({
  questions,
  pageCount,
  currQuestion,
  setCurrQuestion,
  isOpen,
  onOpen,
  onClose,
}: AdminQuestionTableProps) => {
  const deleteQuestion = useDeleteQuestion();
  const updateQuestion = useUpdateQuestion();
  const createQuestion = useCreateQuestion();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: getHeaderNode("ID"),
        cell: info => <Text>{info.getValue()}</Text>,
      }),
      columnHelper.accessor("category", {
        header: getHeaderNode("Category"),
        cell: info => <Text>{info.getValue()}</Text>,
        size: 400,
      }),
      columnHelper.accessor("difficulty", {
        header: getHeaderNode("Difficulty"),
        cell: info => (
          <Text
            color={
              info.getValue() === "Easy"
                ? "green.500"
                : info.getValue() === "Medium"
                ? "yellow.500"
                : "red.500"
            }
            fontWeight="medium"
          >
            {info.getValue()}
          </Text>
        ),
        size: 400,
      }),
      columnHelper.accessor("title", {
        header: () => (
          <Text
            casing="none"
            color="dark.300"
            fontWeight="semibold"
            fontSize="sm"
            py="4"
            letterSpacing="normal"
          >
            Title
          </Text>
        ),
        cell: info => <Text>{info.getValue()}</Text>,
        size: Number.MAX_SAFE_INTEGER,
      }),
      columnHelper.display({
        id: "actions",
        header: getHeaderNode("Actions"),
        cell: ({ row }) => (
          <HStack>
            <IconButton
              aria-label="Edit Question"
              icon={<PiPencilBold />}
              bg="transparent"
              color="dark.300"
              _hover={{
                color: "dark.100",
              }}
              onClick={() => {
                setCurrQuestion(row.original);
                onOpen();
              }}
            />
            <IconButton
              aria-label="Delete Question"
              icon={<PiTrashBold />}
              bg="transparent"
              color="dark.300"
              _hover={{
                color: "dark.100",
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
    data: questions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount || -1,
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
      <TableContainer border="1px" borderColor="dark.800" borderRadius="md">
        <Table variant="unstyled" size="sm">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }}
                  >
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
                borderColor="dark.800"
                borderRadius="md"
                _hover={{
                  bg: "dark.800",
                  transition: "background-color 100ms linear",
                }}
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
      <AdminQuestionModal
        isOpen={isOpen}
        onClose={onClose}
        currQuestion={currQuestion}
        setCurrQuestion={setCurrQuestion}
        handleSave={handleSave}
      />
    </>
  );
};

export default AdminQuestionTable;
