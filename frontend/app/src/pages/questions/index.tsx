import { Page } from "@/components";
import { QuestionsOutlet } from "@/features/questions/components/QuestionsOutlet";

const QuestionsPage = () => {
  return (
    <Page pt="4" display="flex" flexDirection="column" gap="4">
      <QuestionsOutlet />
    </Page>
  );
};

export default QuestionsPage;
