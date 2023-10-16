import { Page } from "@/components";
import { useQuestions } from "@/features/admin/questions/api/useQuestions";
import AdminQuestionFooter from "@/features/admin/questions/components/AdminQuestionFooter";
import AdminQuestionHeader from "@/features/admin/questions/components/AdminQuestionHeader";
import AdminQuestionTable from "@/features/admin/questions/components/AdminQuestionTable";
import { Question } from "@/types/question";
import { Skeleton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

function QuestionsPage() {
  const [currQuestion, setCurrQuestion] = useState<Question>();
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, refetch, isRefetching } = useQuestions({
    pageSize,
    pageNum,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Page pt="4" display="flex" flexDirection="column" gap="4">
      {isLoading ? (
        <Skeleton
          h="32px"
          w="300px"
          startColor="dark.950"
          endColor="dark.800"
          borderRadius="md"
        />
      ) : (
        <AdminQuestionHeader
          onOpen={onOpen}
          setCurrQuestion={setCurrQuestion}
          totalQuestionCount={data.data.pagination.total_questions}
        />
      )}
      {isLoading ? (
        <Skeleton
          h="628px"
          w="full"
          startColor="dark.950"
          endColor="dark.800"
          borderRadius="md"
        />
      ) : (
        <AdminQuestionTable
          questions={data.data.questions}
          pageCount={data.data.pagination.total_pages}
          currQuestion={currQuestion}
          setCurrQuestion={setCurrQuestion}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
      {isLoading ? (
        <Skeleton
          h="32px"
          w="500px"
          startColor="dark.950"
          endColor="dark.800"
          borderRadius="md"
          placeSelf="end"
        />
      ) : (
        <AdminQuestionFooter
          currPage={data.data.pagination.current_page}
          isRefetching={isRefetching}
          pageCount={data.data.pagination.total_pages}
          pageNum={pageNum}
          refetch={refetch}
          setPageNum={setPageNum}
          setPageSize={setPageSize}
        />
      )}
    </Page>
  );
}

export default QuestionsPage;
