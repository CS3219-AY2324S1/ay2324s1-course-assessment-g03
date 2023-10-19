import { Dispatch, SetStateAction, useMemo, useState } from "react";
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
  Tag,
  MenuList,
  Menu,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import { useDeleteQuestion } from "../api/useDeleteQuestion";
import { useUpdateQuestion } from "../api/useUpdateQuestion";
import { Question } from "@/types/question";
import { useCreateQuestion } from "../api/useCreateQuestion";
import {
  PiDotsThreeOutlineFill,
  PiPencilBold,
  PiSortAscendingBold,
  PiSortDescendingBold,
  PiTrashBold,
} from "react-icons/pi";
import AdminQuestionModal from "./AdminQuestionModal";

const columnHelper = createColumnHelper<Question>();

interface AdminQuestionTableProps {
  questions: Question[];
  pageCount: number;
  currQuestion: Partial<Question> | undefined;
  setCurrQuestion: Dispatch<SetStateAction<Partial<Question> | undefined>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

enum SortBy {
  Id = "id",
  Title = "title",
  Category = "category",
  Difficulty = "difficulty",
  Paid = "paid_only",
  Topic = "topic_tags",
}

enum SortOrder {
  Asc = "asc",
  Desc = "desc",
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
  const [sortBy, setSortBy] = useState(SortBy.Id);
  const [sortOrder, setSortOrder] = useState(SortOrder.Asc);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: info => <Text w={8}>{info.getValue()}</Text>,
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: info => <Text fontWeight="medium">{info.getValue()}</Text>,
        size: Number.MAX_SAFE_INTEGER,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: info => <Text w={20}>{info.getValue()}</Text>,
      }),
      columnHelper.accessor("difficulty", {
        header: "Difficulty",
        cell: info => {
          const color =
            info.getValue() === "Easy"
              ? "green"
              : info.getValue() === "Medium"
              ? "yellow"
              : "red";
          return (
            <Tag
              border="1px"
              borderColor={`${color}.900`}
              bg="transparent"
              color={`${color}.500`}
            >
              {info.getValue()}
            </Tag>
          );
        },
      }),
      columnHelper.accessor("paid_only", {
        header: "Paid",
        cell: info => (
          <Tag
            border="1px"
            borderRadius="full"
            borderColor={`${info.getValue() ? "red" : "green"}.900`}
            bg="transparent"
            color={`${info.getValue() ? "red" : "green"}.500`}
          >
            {info.getValue() ? "Paid Only" : "Free"}
          </Tag>
        ),
      }),
      columnHelper.accessor("topic_tags", {
        header: "Topics",
        cell: info => (
          <HStack w={96}>
            {info
              .getValue()
              .slice(0, 2)
              .map(topic => (
                <Tag
                  border="1px"
                  borderColor="dark.800"
                  bg="transparent"
                  color="dark.300"
                >
                  {topic}
                </Tag>
              ))}
            {info.getValue().length > 3 && (
              <Text color="dark.300" fontSize="xs">
                and {info.getValue().length - 2} more...
              </Text>
            )}
          </HStack>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Details"
              icon={<PiDotsThreeOutlineFill />}
              variant="icon"
              size="sm"
            />
            <MenuList
              bg="dark.950"
              shadow="sm"
              border="1px"
              borderColor="dark.800"
              px={2}
            >
              <MenuItem
                bg="transparent"
                borderRadius="md"
                color="dark.100"
                icon={<PiPencilBold />}
                _hover={{ bg: "dark.800" }}
                onClick={() => {
                  setCurrQuestion(row.original);
                  onOpen();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<PiTrashBold />}
                onClick={() =>
                  deleteQuestion.mutate({ questionId: row.original.id })
                }
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
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
    manualSorting: true,
    pageCount,
  });

  const handleSave = (question: Partial<Question> | undefined) => {
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
                    color="dark.300"
                    fontSize="sm"
                    fontWeight="medium"
                    letterSpacing="normal"
                    textTransform="none"
                    w={header.getSize() !== 150 ? header.getSize() : undefined}
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
