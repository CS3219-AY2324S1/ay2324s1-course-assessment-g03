import { Question } from "@/types/question";
import {
  Icon,
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
import { useQuestions } from "./QuestionsOutlet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROLE } from "@/types/user";

interface QuestionsActionsMenuProps {
  row: Row<Question>;
}

const QuestionsActionsMenu = ({ row }: QuestionsActionsMenuProps) => {
  const { setCurrQn, onDeleteModalOpen, onUpsertModalOpen } = useQuestions();
  const navigate = useNavigate();
  const { data } = useAuth();

  return (
    <Menu variant="outline">
      <MenuButton
        as={IconButton}
        aria-label="Actions"
        icon={<PiDotsThreeOutlineFill />}
        variant="icon"
        size="sm"
      />
      <MenuList>
        <MenuItem
          icon={<Icon as={PiListBold} />}
          onClick={() => {
            setCurrQn(row.original);
            navigate(`${row.original.id}`);
          }}
        >
          Details
        </MenuItem>
        {data?.user.role === ROLE.ADMIN && (
          <MenuItem
            icon={<Icon as={PiPencilBold} />}
            onClick={() => {
              setCurrQn(row.original);
              onUpsertModalOpen();
            }}
          >
            Edit
          </MenuItem>
        )}
        {data?.user.role === ROLE.ADMIN && (
          <MenuItem
            icon={<Icon as={PiTrashBold} />}
            onClick={() => {
              setCurrQn(row.original);
              onDeleteModalOpen();
            }}
          >
            Delete
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default QuestionsActionsMenu;
