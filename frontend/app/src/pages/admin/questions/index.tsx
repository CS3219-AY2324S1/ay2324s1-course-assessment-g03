import { Page } from "@/components";
import { AdminQuestionsProvider } from "@/features/admin/questions/providers/AdminQuestionsProvider";
import AdminQuestionsContent from "./content";

const AdminQuestionsPage = () => {
  return (
    <Page pt="4" display="flex" flexDirection="column" gap="4">
      <AdminQuestionsProvider>
        <AdminQuestionsContent />
      </AdminQuestionsProvider>
    </Page>
  );
};

export default AdminQuestionsPage;
