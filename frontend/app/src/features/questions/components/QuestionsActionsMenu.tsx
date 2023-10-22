import { Question } from "@/types/question";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import {
  PiDotsThreeOutlineFill,
  PiListBold,
  PiPencilBold,
  PiTrashBold,
} from "react-icons/pi";
import { useQuestions } from "../providers/QuestionsProvider";

interface QuestionsActionsMenuProps {
  row: Row<Question>;
}

const QuestionsActionsMenu = ({ row }: QuestionsActionsMenuProps) => {
  const { onDetailsDrawerOpen, setCurrQuestion, onDeleteModalOpen } =
    useQuestions();

  return (
    <>
      <Menu variant="outline" direction="rtl">
        <MenuButton
          as={IconButton}
          aria-label="Actions"
          icon={<PiDotsThreeOutlineFill />}
          variant="icon"
          size="sm"
        />
        <MenuList>
          <MenuItem
            icon={<PiListBold />}
            onClick={() => {
              setCurrQuestion(row.original);
              onDetailsDrawerOpen();
            }}
          >
            Details
          </MenuItem>
          <MenuItem
            icon={<PiPencilBold />}
            onClick={() => {
              setCurrQuestion(row.original);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<PiTrashBold />}
            onClick={() => {
              setCurrQuestion(row.original);
              onDeleteModalOpen();
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default QuestionsActionsMenu;
