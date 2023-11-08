import {
  HStack,
  IconButton,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretDownBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretUpBold,
} from "react-icons/pi";
import { useQuestions } from "./QuestionsOutlet";

const QuestionsFooter = () => {
  const {
    data,
    refetch,
    isRefetching,
    isLoading,
    pageNum,
    setPageNum,
    setPageSize,
  } = useQuestions();

  if (isLoading) {
    return (
      <Skeleton
        h="32px"
        w="500px"
        startColor="dark.950"
        endColor="dark.800"
        borderRadius="md"
        placeSelf="end"
      />
    );
  }

  const currPage = data?.data.pagination.current_page;
  const pageCount = data?.data.pagination.total_pages || 1;

  return (
    <>
      <HStack justifyContent="space-between" marginBottom={6}>
        <Text color="dark.100" fontSize="sm">
          {data?.data.pagination.total_questions !== 0 &&
            `${data?.data.pagination.total_questions}  total questions`}
        </Text>
        <HStack spacing={4}>
          <HStack>
            <Text fontWeight="medium" fontSize="sm">
              Rows per page
            </Text>
            <NumberInput
              onChange={async value => {
                await setPageSize(parseInt(value));
                refetch();
              }}
              defaultValue={10}
              min={10}
              max={30}
              step={5}
              size="sm"
              focusBorderColor="dark.800"
              w="16"
            >
              <NumberInputField
                border="1px"
                borderColor="dark.800"
                color="dark.100"
                borderRadius="md"
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  border="none"
                  color="dark.100"
                  children={<PiCaretUpBold />}
                />
                <NumberDecrementStepper
                  border="none"
                  color="dark.100"
                  children={<PiCaretDownBold />}
                />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <HStack>
            <Text fontWeight="medium" fontSize="sm">
              Page {currPage} of {pageCount}
            </Text>
            <IconButton
              aria-label="First Page"
              icon={<PiCaretDoubleLeftBold />}
              variant="outline"
              onClick={async () => {
                await setPageNum(1);
                refetch();
              }}
              isLoading={isRefetching}
              isDisabled={currPage === 1}
            />
            <IconButton
              aria-label="Previous Page"
              icon={<PiCaretLeftBold />}
              variant="outline"
              onClick={async () => {
                await setPageNum(pageNum - 1);
                refetch();
              }}
              isLoading={isRefetching}
              isDisabled={currPage === 1}
            />
            <IconButton
              aria-label="Next Page"
              icon={<PiCaretRightBold />}
              variant="outline"
              onClick={async () => {
                await setPageNum(pageNum + 1);
                refetch();
              }}
              isLoading={isRefetching}
              isDisabled={currPage === pageCount}
            />
            <IconButton
              aria-label="Last Page"
              icon={<PiCaretDoubleRightBold />}
              variant="outline"
              onClick={async () => {
                await setPageNum(pageCount);
                refetch();
              }}
              isLoading={isRefetching}
              isDisabled={currPage === pageCount}
            />
          </HStack>
        </HStack>
      </HStack>
    </>
  );
};
export default QuestionsFooter;
