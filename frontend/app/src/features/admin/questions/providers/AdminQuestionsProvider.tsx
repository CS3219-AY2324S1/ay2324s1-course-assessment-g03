import { Question } from "@/types/question";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_PAGE_NUM,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORTING_STATE,
} from "../constants";
import { SortingState } from "@tanstack/react-table";
import { useDisclosure } from "@chakra-ui/react";
import { useAdminQuestionsQuery } from "../api/useAdminQuestionsQuery";

interface AdminQuestionsContextDefaultValue {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  data: any;
  isLoading: boolean;
  refetch: () => void;
  isRefetching: boolean;
  currQuestion: Partial<Question> | undefined;
  setCurrQuestion: Dispatch<SetStateAction<Partial<Question> | undefined>>;
  isUpsertModalOpen: boolean;
  onUpsertModalOpen: () => void;
  onUpsertModalClose: () => void;
  isDetailsDrawerOpen: boolean;
  onDetailsDrawerOpen: () => void;
  onDetailsDrawerClose: () => void;
  isDeleteModalOpen: boolean;
  onDeleteModalOpen: () => void;
  onDeleteModalClose: () => void;
  btnRef: React.RefObject<any>;
}

const AdminQuestionsContext = createContext<AdminQuestionsContextDefaultValue>({
  pageNum: DEFAULT_PAGE_NUM,
  setPageNum: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  setPageSize: () => {},
  sorting: DEFAULT_SORTING_STATE,
  setSorting: () => {},
  data: undefined,
  isLoading: false,
  refetch: () => {},
  isRefetching: false,
  currQuestion: undefined,
  setCurrQuestion: () => {},
  isUpsertModalOpen: false,
  onUpsertModalOpen: () => {},
  onUpsertModalClose: () => {},
  isDetailsDrawerOpen: false,
  onDetailsDrawerOpen: () => {},
  onDetailsDrawerClose: () => {},
  isDeleteModalOpen: false,
  onDeleteModalOpen: () => {},
  onDeleteModalClose: () => {},
  btnRef: { current: null },
});

interface AdminQuestionsProviderProps {
  children: ReactNode;
}

export const AdminQuestionsProvider = ({
  children,
}: AdminQuestionsProviderProps) => {
  const [pageNum, setPageNum] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING_STATE);
  const { data, isLoading, isRefetching, refetch } = useAdminQuestionsQuery({
    pageNum,
    pageSize,
    sorting,
  });
  const [currQuestion, setCurrQuestion] = useState<Partial<Question>>();
  const {
    isOpen: isUpsertModalOpen,
    onOpen: onUpsertModalOpen,
    onClose: onUpsertModalClose,
  } = useDisclosure();
  const {
    isOpen: isDetailsDrawerOpen,
    onOpen: onDetailsDrawerOpen,
    onClose: onDetailsDrawerClose,
  } = useDisclosure();
  const btnRef = useRef();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  return (
    <AdminQuestionsContext.Provider
      value={{
        pageNum,
        setPageNum,
        pageSize,
        setPageSize,
        sorting,
        setSorting,
        data,
        isLoading,
        refetch,
        isRefetching,
        currQuestion,
        setCurrQuestion,
        isUpsertModalOpen,
        onUpsertModalOpen,
        onUpsertModalClose,
        isDetailsDrawerOpen,
        onDetailsDrawerOpen,
        onDetailsDrawerClose,
        isDeleteModalOpen,
        onDeleteModalOpen,
        onDeleteModalClose,
        btnRef,
      }}
    >
      {children}
    </AdminQuestionsContext.Provider>
  );
};

export const useAdminQuestions = () => useContext(AdminQuestionsContext);
