import { Page } from "@/components";
import { QuestionsProvider } from "@/features/questions/providers/QuestionsProvider";
import QuestionsContent from "./content";

const QuestionsPage = () => {
  return (
    <Page pt="4" display="flex" flexDirection="column" gap="4">
      <QuestionsProvider>
        <QuestionsContent />
      </QuestionsProvider>
    </Page>
  );
};

export default QuestionsPage;
