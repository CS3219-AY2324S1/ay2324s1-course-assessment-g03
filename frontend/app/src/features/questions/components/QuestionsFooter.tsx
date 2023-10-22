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
} from "@chakra-ui/react";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretDownBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretUpBold,
} from "react-icons/pi";
import { useQuestions } from "../providers/QuestionsProvider";

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
  const pageCount = data?.data.pagination.total_pages;

  return (
    <>
      <HStack spacing="4" alignSelf="end">
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
            size="sm"
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
            size="sm"
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
            size="sm"
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
            size="sm"
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
    </>
  );
};
export default QuestionsFooter;