import { Button, HStack, Icon, Skeleton } from "@chakra-ui/react";
import { PiPlusBold } from "react-icons/pi";
import { useQuestions } from "./QuestionsOutlet";
import QuestionsSearch from "./QuestionsSearch";
import { useAuth } from "@/hooks";
import { ROLE } from "@/types/user";
import QuestionsFilters from "./QuestionsFilters";

const QuestionsHeader = () => {
  const { isLoading, setCurrQn, onUpsertModalOpen } = useQuestions();
  const { data: authData } = useAuth();

  if (isLoading) {
    return (
      <Skeleton
        h="32px"
        startColor="dark.950"
        endColor="dark.800"
        borderRadius="md"
      />
    );
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="end">
        <HStack spacing={4}>
          <QuestionsSearch />
          <QuestionsFilters />
        </HStack>
        {authData?.user.role === ROLE.ADMIN && (
          <Button
            onClick={() => {
              setCurrQn(undefined);
              onUpsertModalOpen();
            }}
            variant="outline"
            leftIcon={<Icon as={PiPlusBold} />}
          >
            Create Question
          </Button>
        )}
      </HStack>
    </>
  );
};

export default QuestionsHeader;
