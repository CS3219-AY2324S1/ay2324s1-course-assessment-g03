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
import AdminQuestionsActionsMenu from "./AdminQuestionsActionsMenu";
import { useAdminQuestions } from "../providers/AdminQuestionsProvider";
import { DEFAULT_SORTING_STATE } from "../constants";

const columnHelper = createColumnHelper<Question>();

const AdminQuestionsTable = () => {
  const { sorting, setSorting, data, refetch, isLoading } = useAdminQuestions();

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
        header: "Paid",
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
            {info
              .getValue()
              .slice(0, 2)
              .map(topic => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            {info.getValue().length > 3 && (
              <Text color="dark.300" fontSize="xs">
                & {info.getValue().length - 2} more...
              </Text>
            )}
          </HStack>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => <AdminQuestionsActionsMenu row={row} />,
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
        startColor="dark.950"
        endColor="dark.800"
        borderRadius="md"
      />
    );
  }

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
    </>
  );
};

export default AdminQuestionsTable;
