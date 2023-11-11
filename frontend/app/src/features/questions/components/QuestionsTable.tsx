import { useMemo } from "react";
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
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { Question } from "@/types/question";
import {
  PiListBold,
  PiSortAscendingBold,
  PiSortDescendingBold,
} from "react-icons/pi";
import QuestionsActionsMenu from "./QuestionsActionsMenu";
import { useQuestions } from "./QuestionsOutlet";
import { DEFAULT_SORTING_STATE } from "../constants";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<Question>();

const QuestionsTable = () => {
  const { sorting, setSorting, data, refetch, isLoading, setCurrQn } =
    useQuestions();
  const navigate = useNavigate();

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
        cell: info => (
          <Tag
            variant={
              info.getValue() === "Easy"
                ? "green"
                : info.getValue() === "Medium"
                ? "yellow"
                : "red"
            }
          >
            {info.getValue()}
          </Tag>
        ),
      }),
      columnHelper.accessor("paid_only", {
        header: "Status",
        cell: info => (
          <Tag variant={info.getValue() ? "red" : "green"} borderRadius="full">
            {info.getValue() ? "Paid Only" : "Free"}
          </Tag>
        ),
      }),
      columnHelper.accessor("topic_tags", {
        header: "Topics",
        cell: info => (
          <HStack w={96}>
            {Array.isArray(info.getValue())
              ? info
                  .getValue()
                  ?.slice(0, 2)
                  .map(topic => <Tag key={topic}>{topic}</Tag>)
              : null}
            {info.getValue()?.length > 3 ? (
              <Text color="dark.300" fontSize="xs">
                & {info.getValue().length - 2} more...
              </Text>
            ) : null}
          </HStack>
        ),
        enableSorting: false,
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => <QuestionsActionsMenu row={row} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    initialState: {
      sorting: DEFAULT_SORTING_STATE,
    },
    data: data?.data.questions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.data?.pagination?.total_pages || -1,
    manualSorting: true,
    enableSortingRemoval: false,
    state: {
      sorting,
    },
    onSortingChange: async sorting => {
      await setSorting(sorting);
      refetch();
    },
  });

  if (isLoading) {
    return (
      <Skeleton
        h="628px"
        w="full"
        startColor="dark.900"
        endColor="dark.700"
        borderRadius="md"
      />
    );
  }

  return (
    <>
      <TableContainer border="1px" borderColor="dark.700" borderRadius="md">
        <Table variant="unstyled" size="sm">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th
                    key={header.id}
                    color={
                      sorting[0].id === header.column.id
                        ? "dark.100"
                        : "dark.300"
                    }
                    fontSize="sm"
                    fontWeight="medium"
                    letterSpacing="normal"
                    textTransform="none"
                    w={header.getSize() !== 150 ? header.getSize() : undefined}
                    {...{
                      _hover: header.column.getCanSort()
                        ? {
                            color: "dark.100",
                            cursor: "pointer",
                          }
                        : {},
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <Box
                        display="flex"
                        alignItems="center"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: (
                            <IconButton
                              aria-label={`sort-asc-${header.column.id}`}
                              color="inherit"
                              icon={<PiSortAscendingBold />}
                              variant="icon"
                              size="sm"
                              _hover={{ bg: "transparent" }}
                            />
                          ),
                          desc: (
                            <IconButton
                              aria-label={`sort-desc-${header.column.id}`}
                              color="inherit"
                              icon={<PiSortDescendingBold />}
                              variant="icon"
                              size="sm"
                              _hover={{ bg: "transparent" }}
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <IconButton
                            aria-label={`no-sort-${header.column.id}`}
                            disabled
                            color="transparent"
                            icon={<PiListBold />}
                            variant="icon"
                            size="sm"
                            _hover={{ bg: "transparent" }}
                          />
                        )}
                      </Box>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.length === 0 && (
              <Tr p={4} display="flex">
                <Text fontSize="sm"> No questions found.</Text>
              </Tr>
            )}
            {table.getRowModel().rows.map(row => (
              <Tr
                key={row.id}
                borderTop="1px"
                borderColor="dark.700"
                borderRadius="md"
                _hover={{
                  cursor: "pointer",
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <Td
                    key={cell.id}
                    onClick={() => {
                      if (cell.column.id !== "actions") {
                        setCurrQn(row.original);
                        navigate(`${row.original.id}`);
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default QuestionsTable;
