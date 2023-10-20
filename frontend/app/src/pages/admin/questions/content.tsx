import AdminQuestionsDeleteModal from "@/features/admin/questions/components/AdminQuestionsDeleteModal";
import AdminQuestionsDetailsDrawer from "@/features/admin/questions/components/AdminQuestionsDetailsDrawer";
import AdminQuestionsFooter from "@/features/admin/questions/components/AdminQuestionsFooter";
import AdminQuestionsHeader from "@/features/admin/questions/components/AdminQuestionsHeader";
import AdminQuestionsTable from "@/features/admin/questions/components/AdminQuestionsTable";
import AdminQuestionsUpsertModal from "@/features/admin/questions/components/AdminQuestionsUpsertModal";

const AdminQuestionsContent = () => {
  return (
    <>
      <AdminQuestionsHeader />
      <AdminQuestionsTable />
      <AdminQuestionsFooter />
      <AdminQuestionsUpsertModal />
      <AdminQuestionsDetailsDrawer />
      <AdminQuestionsDeleteModal />
    </>
  );
};

export default AdminQuestionsContent;
