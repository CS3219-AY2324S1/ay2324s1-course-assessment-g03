import QuestionsDeleteModal from "@/features/questions/components/QuestionsDeleteModal";
import QuestionsDetailsDrawer from "@/features/questions/components/QuestionsDetailsDrawer";
import QuestionsFooter from "@/features/questions/components/QuestionsFooter";
import QuestionsHeader from "@/features/questions/components/QuestionsHeader";
import QuestionsTable from "@/features/questions/components/QuestionsTable";
import QuestionsUpsertModal from "@/features/questions/components/QuestionsUpsertModal";

const QuestionsContent = () => {
  return (
    <>
      <QuestionsHeader />
      <QuestionsTable />
      <QuestionsFooter />
      <QuestionsUpsertModal />
      <QuestionsDetailsDrawer />
      <QuestionsDeleteModal />
    </>
  );
};

export default QuestionsContent;
