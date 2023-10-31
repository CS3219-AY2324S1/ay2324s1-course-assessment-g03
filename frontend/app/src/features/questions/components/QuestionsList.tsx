import DeleteQuestionModal from "@/features/questions/components/DeleteQuestionModal";
import QuestionsFooter from "@/features/questions/components/QuestionsFooter";
import QuestionsHeader from "@/features/questions/components/QuestionsHeader";
import QuestionsTable from "@/features/questions/components/QuestionsTable";
import UpsertQuestionModal from "@/features/questions/components/UpsertQuestionModal";

const QuestionsList = () => {
  return (
    <>
      <QuestionsHeader />
      <QuestionsTable />
      <QuestionsFooter />
      <UpsertQuestionModal />
      <DeleteQuestionModal />
    </>
  );
};

export default QuestionsList;
