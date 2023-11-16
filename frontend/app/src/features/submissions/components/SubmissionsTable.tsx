import { useAuth } from "@/hooks";
import { Submission } from "@/types/submission";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  PiCodeBold,
  PiListBold,
  PiSortAscendingBold,
  PiSortDescendingBold,
} from "react-icons/pi";
import SubmissionsCodeModal from "./SubmissionsCodeModal";
import { LANGUAGES, SUBMISSIONS_DEFAULT_SORTING_STATE } from "../constants";

const columnHelper = createColumnHelper<Submission>();

interface SubmissionsTableProps {
  submissions: Submission[];
}

const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  const { data } = useAuth();
  const {
    isOpen: isCodeModalOpen,
    onOpen: onCodeModalOpen,
    onClose: onCodeModalClose,
  } = useDisclosure();
  const [currCode, setCurrCode] = useState("");
  const [sorting, setSorting] = useState<SortingState>(
    SUBMISSIONS_DEFAULT_SORTING_STATE,
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("questionId", {
        header: "Question ID",
        cell: info => <Text w={8}>{info.getValue()}</Text>,
      }),
      // columnHelper.accessor("title", {
      //   header: "Title",
      //   cell: info => <Text fontWeight="medium">{info.getValue()}</Text>,
      //   size: Number.MAX_SAFE_INTEGER,
      // }),
      columnHelper.accessor("createdAt", {
        header: "Attempted At",
        cell: info => (
          <Text>
            {new Date(info.getValue()).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>
        ),
      }),
      columnHelper.accessor("users", {
        header: "Attempted With",
        cell: info =>
          info
            .getValue()
            ?.filter(user => user.id !== data?.user.id)
            ?.map(user => (
              <VStack spacing={0} p={2} alignItems="start">
                {user.name && <Text fontSize="sm">{user.name}</Text>}
                {user.email && (
                  <Text fontSize="sm" color="dark.300">
                    {user.email}
                  </Text>
                )}
              </VStack>
            )),
      }),
      columnHelper.accessor("lang", {
        header: "Language",
        cell: info => (
          <Text>{LANGUAGES[info.getValue()] || info.getValue()}</Text>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <Button
            leftIcon={<PiCodeBold />}
            onClick={() => {
              setCurrCode(row.original.code);
              onCodeModalOpen();
            }}
          >
            View Code
          </Button>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    initialState: {
      sorting: SUBMISSIONS_DEFAULT_SORTING_STATE,
    },
    data: submissions,
    columns,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

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
                <Text fontSize="sm"> No submissions yet.</Text>
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
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <SubmissionsCodeModal
        code={currCode}
        isOpen={isCodeModalOpen}
        onClose={onCodeModalClose}
      />
    </>
  );
};

export default SubmissionsTable;
