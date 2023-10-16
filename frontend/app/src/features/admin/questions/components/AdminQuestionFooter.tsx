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
      <Text fontWeight="semibold" fontSize="sm">
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
      <Text fontWeight="semibold" fontSize="sm">
        Page {currPage + 1} of {pageCount}
      </Text>
      <IconButton
        variant="outline"
        aria-label="Previous Page"
        icon={<PiCaretLeftBold />}
        size="sm"
        onClick={async () => {
          await setPageNum(pageNum - 1);
          refetch();
        }}
        isLoading={isRefetching}
        isDisabled={currPage === 0}
      />
      <IconButton
        variant="outline"
        aria-label="Next Page"
        icon={<PiCaretRightBold />}
        size="sm"
        onClick={async () => {
          await setPageNum(pageNum + 1);
          refetch();
        }}
        isLoading={isRefetching}
        isDisabled={currPage + 1 === pageCount}
      />
    </HStack>
  </HStack>
);

export default AdminQuestionFooter;
