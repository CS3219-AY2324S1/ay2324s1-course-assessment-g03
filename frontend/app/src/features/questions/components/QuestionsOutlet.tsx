import { Question } from "@/types/question";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  DEFAULT_PAGE_NUM,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORTING_STATE,
  INIT_QUESTIONS_FILTERS,
} from "../constants";
import { SortingState } from "@tanstack/react-table";
import { useDisclosure } from "@chakra-ui/react";
import { useQuestionsQuery } from "../api/useQuestionsQuery";
import { Outlet, useOutletContext } from "react-router-dom";
import { QuestionsFilters } from "./QuestionsFilters";

interface QuestionsContextType {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filters: QuestionsFilters;
  setFilters: Dispatch<SetStateAction<QuestionsFilters>>;
  data: any;
  isLoading: boolean;
  refetch: () => void;
  isRefetching: boolean;
  currQuestion: Partial<Question> | undefined;
  setCurrQuestion: Dispatch<SetStateAction<Partial<Question> | undefined>>;
  isCreateModalOpen: boolean;
  onCreateModalOpen: () => void;
  onCreateModalClose: () => void;
  isUpdateModalOpen: boolean;
  onUpdateModalOpen: () => void;
  onUpdateModalClose: () => void;
  isDeleteModalOpen: boolean;
  onDeleteModalOpen: () => void;
  onDeleteModalClose: () => void;
  btnRef: React.RefObject<any>;
}

export const QuestionsOutlet = () => {
  const [pageNum, setPageNum] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING_STATE);
  const [filters, setFilters] = useState<QuestionsFilters>(
    INIT_QUESTIONS_FILTERS,
  );
  const [search, setSearch] = useState("");
  const { data, isLoading, isRefetching, refetch } = useQuestionsQuery({
    pageNum,
    pageSize,
    sorting,
    search,
    filters,
  });
  const [currQuestion, setCurrQuestion] = useState<Partial<Question>>();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const btnRef = useRef();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  return (
    <Outlet
      context={{
        pageNum,
        setPageNum,
        pageSize,
        setPageSize,
        sorting,
        setSorting,
        search,
        setSearch,
        filters,
        setFilters,
        data,
        isLoading,
        refetch,
        isRefetching,
        currQuestion,
        setCurrQuestion,
        isCreateModalOpen,
        onCreateModalOpen,
        onCreateModalClose,
        isUpdateModalOpen,
        onUpdateModalOpen,
        onUpdateModalClose,
        isDeleteModalOpen,
        onDeleteModalOpen,
        onDeleteModalClose,
        btnRef,
      }}
    />
  );
};

export const useQuestions = () => useOutletContext<QuestionsContextType>();
