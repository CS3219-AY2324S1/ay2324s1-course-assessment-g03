import { Page } from "@/components";
import QuestionsTable from "@/features/questions/components/QuestionsTable";

function QuestionsPage() {
  return (
    <Page pt="8" display="flex" flexDirection="column" gap="8">
      <QuestionsTable />
    </Page>
  );
}

export default QuestionsPage;
