import {
  HStack,
  IconButton,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretDownBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretUpBold,
} from "react-icons/pi";

interface AdminQuestionFooterProps {
  currPage: number;
  isRefetching: boolean;
  pageCount: number;
  pageNum: number;
  refetch: () => void;
  setPageNum: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}

const AdminQuestionFooter = ({
  currPage,
  isRefetching,
  pageCount,
  pageNum,
  refetch,
  setPageNum,
  setPageSize,
}: AdminQuestionFooterProps) => (
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
);

export default AdminQuestionFooter;
