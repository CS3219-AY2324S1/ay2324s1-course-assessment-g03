import QuestionsDeleteModal from "@/features/questions/components/QuestionsDeleteModal";
import QuestionsFooter from "@/features/questions/components/QuestionsFooter";
import QuestionsHeader from "@/features/questions/components/QuestionsHeader";
import QuestionsTable from "@/features/questions/components/QuestionsTable";
import QuestionsUpsertModal from "@/features/questions/components/QuestionsUpsertModal";

const QuestionsList = () => {
  return (
    <>
      <QuestionsHeader />
      <QuestionsTable />
      <QuestionsFooter />
      <QuestionsUpsertModal />
      <QuestionsDeleteModal />
    </>
  );
};

export default QuestionsList;
